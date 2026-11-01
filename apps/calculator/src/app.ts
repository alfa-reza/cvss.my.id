import {
  calculateScore,
  createInitialMetrics,
  formatResultSummary,
  getMissingBaseMetrics,
  getVersionSchema,
  parseVector,
  serializeVector,
  type CvssVersion,
  type MetricDefinition,
  type ScoreResult,
  type SeverityLevel,
  type VersionSchema,
} from '@cvss/core';

const SCHEMA_VERSION = 1;

interface StoredDraft {
  schemaVersion: number;
  version: CvssVersion;
  metrics: Record<string, string>;
  activeTab: string;
  rawEditorText: string;
  lastValidVector: string;
  isEditorDirtyInvalid: boolean;
}

interface AppState {
  version: CvssVersion;
  schema: VersionSchema;
  metrics: Record<string, string>;
  activeTab: string;
  rawEditorText: string;
  lastValidVector: string;
  editorError: string | null;
  detectedOtherVersion: CvssVersion | null;
  normalizedOtherVector: string | null;
  hasUrlVectorOnLoad: boolean;
  urlError: string | null;
  feedbackMessage: string;
  fallbackCopyValue: string | null;
}

function getStorageKey(version: CvssVersion): string {
  return `cvss_draft_v${SCHEMA_VERSION}_${version}`;
}

function loadDraftFromSession(version: CvssVersion): StoredDraft | null {
  try {
    const raw = window.sessionStorage.getItem(getStorageKey(version));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredDraft>;
    if (
      !parsed ||
      parsed.schemaVersion !== SCHEMA_VERSION ||
      parsed.version !== version ||
      typeof parsed.metrics !== 'object' ||
      parsed.metrics === null
    ) {
      window.sessionStorage.removeItem(getStorageKey(version));
      return null;
    }
    const cleanMetrics = createInitialMetrics(version);
    const schema = getVersionSchema(version);
    for (const def of schema.allMetrics) {
      const candidate = parsed.metrics[def.key];
      if (typeof candidate === 'string' && def.options.some((o) => o.value === candidate)) {
        cleanMetrics[def.key] = candidate;
      }
    }
    const validTab = schema.groups.some((g) => g.id === parsed.activeTab)
      ? (parsed.activeTab as string)
      : schema.groups[0].id;
    return {
      schemaVersion: SCHEMA_VERSION,
      version,
      metrics: cleanMetrics,
      activeTab: validTab,
      rawEditorText: typeof parsed.rawEditorText === 'string' ? parsed.rawEditorText : '',
      lastValidVector: typeof parsed.lastValidVector === 'string' ? parsed.lastValidVector : '',
      isEditorDirtyInvalid: Boolean(parsed.isEditorDirtyInvalid),
    };
  } catch {
    return null;
  }
}

function saveDraftToSession(state: AppState): void {
  try {
    const payload: StoredDraft = {
      schemaVersion: SCHEMA_VERSION,
      version: state.version,
      metrics: state.metrics,
      activeTab: state.activeTab,
      rawEditorText: state.rawEditorText,
      lastValidVector: state.lastValidVector,
      isEditorDirtyInvalid: state.editorError !== null,
    };
    window.sessionStorage.setItem(getStorageKey(state.version), JSON.stringify(payload));
  } catch {
    // sessionStorage may be blocked in strict privacy modes; fail gracefully
  }
}

function clearDraftFromSession(version: CvssVersion): void {
  try {
    window.sessionStorage.removeItem(getStorageKey(version));
  } catch {
    // ignore
  }
}

function clearStaleUrlVectorParam(state: AppState): void {
  if (!state.hasUrlVectorOnLoad) return;
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has('vector')) {
      url.searchParams.delete('vector');
      const nextUrl = url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : '') + url.hash;
      window.history.replaceState(null, '', nextUrl);
    }
    state.hasUrlVectorOnLoad = false;
  } catch {
    state.hasUrlVectorOnLoad = false;
  }
}

function getSeverityClass(sev: SeverityLevel): string {
  switch (sev) {
    case 'None':
      return 'sev-none';
    case 'Low':
      return 'sev-low';
    case 'Medium':
      return 'sev-medium';
    case 'High':
      return 'sev-high';
    case 'Critical':
      return 'sev-critical';
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function countDefinedInGroup(version: CvssVersion, groupId: string, metrics: Record<string, string>): string {
  const schema = getVersionSchema(version);
  const group = schema.groups.find((g) => g.id === groupId);
  if (!group) return '0';
  const total = group.metrics.length;
  let defined = 0;
  for (const m of group.metrics) {
    const val = metrics[m.key];
    if (m.required) {
      if (val && val !== '') defined += 1;
    } else {
      if (val && val !== m.defaultValue) defined += 1;
    }
  }
  return mGroupSummary(group.id, defined, total);
}

function mGroupSummary(groupId: string, defined: number, total: number): string {
  if (groupId === 'base') {
    return `${defined}/${total}`;
  }
  return defined > 0 ? `+${defined}` : '0';
}

function initCalculator(): void {
  const root = document.getElementById('calculator-app');
  const urlBanner = document.getElementById('url-error-banner');
  const bodyVersion = document.body.getAttribute('data-cvss-version') as CvssVersion | null;
  if (!root || !bodyVersion) return;

  const version: CvssVersion = ['4.0', '3.1', '3.0', '2.0'].includes(bodyVersion) ? bodyVersion : '4.0';
  const schema = getVersionSchema(version);

  const state: AppState = {
    version,
    schema,
    metrics: createInitialMetrics(version),
    activeTab: schema.groups[0].id,
    rawEditorText: '',
    lastValidVector: '',
    editorError: null,
    detectedOtherVersion: null,
    normalizedOtherVector: null,
    hasUrlVectorOnLoad: false,
    urlError: null,
    feedbackMessage: '',
    fallbackCopyValue: null,
  };

  // 1. Check URL ?vector=... parameter first (URL takes precedence over sessionStorage)
  const urlParams = new URLSearchParams(window.location.search);
  const rawUrlVector = urlParams.get('vector');

  if (rawUrlVector !== null) {
    state.hasUrlVectorOnLoad = true;
    if (rawUrlVector.length > 512) {
      state.urlError = 'The shared URL vector parameter exceeds the maximum allowed length (512 characters).';
      state.rawEditorText = rawUrlVector.slice(0, 512);
      state.editorError = state.urlError;
    } else {
      const parsed = parseVector(version, rawUrlVector);
      if (parsed.ok) {
        state.metrics = parsed.metrics;
        state.lastValidVector = parsed.canonicalVector;
        state.rawEditorText = parsed.canonicalVector;
        state.editorError = null;
        saveDraftToSession(state);
      } else {
        // Invalid shared URL produces a visible error and never falls back silently to unrelated saved data
        state.urlError = `Invalid shared URL vector: ${parsed.error}`;
        state.rawEditorText = rawUrlVector;
        state.editorError = parsed.error;
        state.detectedOtherVersion = parsed.detectedOtherVersion ?? null;
        state.normalizedOtherVector = parsed.normalizedOtherVector ?? null;
      }
    }
  } else {
    // 2. Otherwise restore from sessionStorage if available
    const saved = loadDraftFromSession(version);
    if (saved) {
      state.metrics = saved.metrics;
      state.activeTab = saved.activeTab;
      state.lastValidVector = serializeVector(version, saved.metrics);
      if (saved.isEditorDirtyInvalid && saved.rawEditorText) {
        state.rawEditorText = saved.rawEditorText;
        const validation = parseVector(version, saved.rawEditorText);
        if (!validation.ok) {
          state.editorError = validation.error;
          state.detectedOtherVersion = validation.detectedOtherVersion ?? null;
          state.normalizedOtherVector = validation.normalizedOtherVector ?? null;
        } else {
          state.metrics = validation.metrics;
          state.lastValidVector = validation.canonicalVector;
          state.rawEditorText = validation.canonicalVector;
        }
      } else {
        state.rawEditorText = state.lastValidVector;
      }
    }
  }

  function updateUrlErrorBanner(): void {
    if (!urlBanner) return;
    if (state.urlError) {
      urlBanner.classList.remove('is-hidden');
      urlBanner.innerHTML = `
        <span><strong>Shared URL Error:</strong> ${escapeHtml(state.urlError)}</span>
        <button type="button" class="btn" id="dismiss-url-error-btn">Clear Invalid URL</button>
      `;
      const dismissBtn = document.getElementById('dismiss-url-error-btn');
      dismissBtn?.addEventListener('click', () => {
        state.urlError = null;
        clearStaleUrlVectorParam(state);
        state.rawEditorText = state.lastValidVector;
        state.editorError = null;
        state.detectedOtherVersion = null;
        state.normalizedOtherVector = null;
        saveDraftToSession(state);
        renderAll();
      });
    } else {
      urlBanner.classList.add('is-hidden');
      urlBanner.innerHTML = '';
    }
  }

  function renderMetricControl(metric: MetricDefinition, isDisabled: boolean): string {
    const currentVal = state.metrics[metric.key] ?? metric.defaultValue;
    const isMissingBase = metric.required && (!currentVal || currentVal === '');
    const selectedOption = metric.options.find((o) => o.value === currentVal);
    const stateTag = isMissingBase
      ? 'Required (Unselected)'
      : selectedOption
        ? `Selected: ${selectedOption.label}`
        : '';

    let controlHtml = '';
    if (metric.controlType === 'segmented') {
      const buttonsHtml = metric.options
        .map((opt) => {
          const isSelected = currentVal === opt.value;
          return `
            <button
              type="button"
              role="radio"
              aria-checked="${isSelected ? 'true' : 'false'}"
              class="seg-btn"
              data-metric-key="${escapeHtml(metric.key)}"
              data-metric-val="${escapeHtml(opt.value)}"
              title="${escapeHtml(opt.description)}"
              ${isDisabled ? 'disabled' : ''}
            >
              <span>${escapeHtml(opt.label)}</span>
              <span class="seg-check" aria-hidden="true">${isSelected ? '[x]' : '[ ]'}</span>
            </button>
          `;
        })
        .join('');

      controlHtml = `
        <div
          class="segmented-group"
          role="radiogroup"
          aria-label="${escapeHtml(metric.name)} (${escapeHtml(metric.key)})"
        >
          ${buttonsHtml}
        </div>
      `;
    } else {
      const selectId = `select-metric-${metric.key}`;
      const optionsHtml = metric.options
        .map((opt) => {
          const isSelected = currentVal === opt.value;
          return `<option value="${escapeHtml(opt.value)}" ${isSelected ? 'selected' : ''}>${escapeHtml(opt.label)}</option>`;
        })
        .join('');

      controlHtml = `
        <div class="select-wrapper">
          <label for="${escapeHtml(selectId)}" class="metric-state-tag">Choose ${escapeHtml(metric.name)} (${escapeHtml(metric.key)})</label>
          <select
            id="${escapeHtml(selectId)}"
            class="metric-select"
            data-metric-select="${escapeHtml(metric.key)}"
            ${isDisabled ? 'disabled' : ''}
          >
            ${optionsHtml}
          </select>
        </div>
      `;
    }

    const optionHelpHtml = selectedOption
      ? `<p class="selected-option-help"><strong>${escapeHtml(selectedOption.label)}:</strong> ${escapeHtml(selectedOption.description)}</p>`
      : '';

    return `
      <div class="metric-card ${isMissingBase ? 'is-missing' : ''}">
        <div class="metric-top">
          <span class="metric-label">
            ${escapeHtml(metric.name)}
            <span class="metric-abbr">${escapeHtml(metric.key)}</span>
          </span>
          <span class="metric-state-tag">${escapeHtml(stateTag)}</span>
        </div>
        <p class="metric-desc">${escapeHtml(metric.description)}</p>
        ${controlHtml}
        ${optionHelpHtml}
      </div>
    `;
  }

  function renderMetricsColumn(): string {
    const activeGroup =
      state.schema.groups.find((g) => g.id === state.activeTab) ?? state.schema.groups[0];
    const isControlsDisabled = state.editorError !== null;

    const tabsHtml = state.schema.groups
      .map((group) => {
        const isSelected = group.id === activeGroup.id;
        const countBadge = countDefinedInGroup(state.version, group.id, state.metrics);
        return `
          <button
            type="button"
            role="tab"
            id="tab-${escapeHtml(group.id)}"
            aria-selected="${isSelected ? 'true' : 'false'}"
            aria-controls="panel-${escapeHtml(group.id)}"
            tabindex="${isSelected ? '0' : '-1'}"
            class="tab-btn"
            data-tab-id="${escapeHtml(group.id)}"
          >
            <span>${escapeHtml(group.label)}</span>
            <span class="tab-count">${escapeHtml(countBadge)}</span>
          </button>
        `;
      })
      .join('');

    // Group metrics by subGroup while preserving order
    const subGroups: Array<{ title: string; items: MetricDefinition[] }> = [];
    for (const m of activeGroup.metrics) {
      const existing = subGroups.find((sg) => sg.title === m.subGroup);
      if (existing) {
        existing.items.push(m);
      } else {
        subGroups.push({ title: m.subGroup, items: [m] });
      }
    }

    const subGroupsHtml = subGroups
      .map((sg) => {
        const cards = sg.items.map((m) => renderMetricControl(m, isControlsDisabled)).join('');
        return `
          <section class="sub-group-section" aria-label="${escapeHtml(sg.title)}">
            <h3 class="sub-group-title">${escapeHtml(sg.title)}</h3>
            <div class="metrics-list">
              ${cards}
            </div>
          </section>
        `;
      })
      .join('');

    return `
      <div class="metrics-column">
        <div class="tabs-bar" role="tablist" aria-label="CVSS v${escapeHtml(state.version)} Metric Groups">
          ${tabsHtml}
        </div>
        <div
          id="panel-${escapeHtml(activeGroup.id)}"
          role="tabpanel"
          aria-labelledby="tab-${escapeHtml(activeGroup.id)}"
        >
          <div class="group-header">
            <div class="group-header-text">
              <h2>${escapeHtml(activeGroup.label)} Metrics</h2>
              <p>${escapeHtml(activeGroup.description)}</p>
            </div>
            <button
              type="button"
              class="btn"
              id="reset-group-btn"
              ${isControlsDisabled ? 'disabled' : ''}
            >
              Reset ${escapeHtml(activeGroup.label)}
            </button>
          </div>
          ${subGroupsHtml}
        </div>
      </div>
    `;
  }

  function renderScorePanel(scoreResult: ScoreResult): string {
    const isOutOfSync = state.editorError !== null;
    const isActionable = scoreResult.isComplete && !isOutOfSync;
    const activeGroup =
      state.schema.groups.find((g) => g.id === state.activeTab) ?? state.schema.groups[0];

    let syncBadgeHtml = `<span class="sync-badge">Live</span>`;
    if (isOutOfSync) {
      syncBadgeHtml = `<span class="sync-badge is-warning">Out of sync (invalid vector draft)</span>`;
    } else if (!scoreResult.isComplete) {
      syncBadgeHtml = `<span class="sync-badge">Awaiting Base metrics</span>`;
    }

    let readoutHtml = '';
    let breakdownHtml = '';

    if (!scoreResult.isComplete) {
      const missingList = scoreResult.missingBaseMetrics.map((k) => `<code>${escapeHtml(k)}</code>`).join(', ');
      readoutHtml = `
        <div class="score-readout" aria-live="polite">
          <div>
            <div class="score-primary-value is-incomplete" id="score-value-display">Incomplete</div>
            <p class="missing-hint">Select required Base metrics: ${missingList}</p>
          </div>
          <span class="severity-pill sev-none">Incomplete</span>
        </div>
      `;
    } else {
      const sevClass = getSeverityClass(scoreResult.primarySeverity);
      const nomenclatureLabel =
        scoreResult.version === '4.0' && scoreResult.nomenclature
          ? ` (${scoreResult.nomenclature})`
          : '';
      readoutHtml = `
        <div class="score-readout" aria-live="polite">
          <div>
            <span class="subscore-label">Overall Score${escapeHtml(nomenclatureLabel)}${isOutOfSync ? ' [Last Valid]' : ''}</span>
            <div class="score-primary-value" id="score-value-display">${scoreResult.primaryScore.toFixed(1)}</div>
          </div>
          <span class="severity-pill ${sevClass}" id="score-severity-display">${escapeHtml(scoreResult.primarySeverity)}</span>
        </div>
      `;

      if (scoreResult.version === '4.0') {
        const items: string[] = [];
        items.push(`
          <div class="subscore-item">
            <span class="subscore-label">Nomenclature</span>
            <span class="subscore-val">${escapeHtml(scoreResult.nomenclature ?? 'CVSS-B')}</span>
          </div>
        `);
        if (scoreResult.hasTemporalOrThreat || scoreResult.hasEnvironmental) {
          items.push(`
            <div class="subscore-item">
              <span class="subscore-label">Base Reference (CVSS-B)</span>
              <span class="subscore-val">${scoreResult.baseScore.toFixed(1)} (${escapeHtml(scoreResult.baseSeverity)})</span>
            </div>
          `);
        }
        if (scoreResult.macroVector) {
          items.push(`
            <div class="subscore-item">
              <span class="subscore-label">MacroVector</span>
              <span class="subscore-val">${escapeHtml(scoreResult.macroVector)}</span>
            </div>
          `);
        }
        breakdownHtml = `<div class="score-breakdown">${items.join('')}</div>`;
      } else {
        const items: string[] = [];
        items.push(`
          <div class="subscore-item">
            <span class="subscore-label">Base Score</span>
            <span class="subscore-val">${scoreResult.baseScore.toFixed(1)} (${escapeHtml(scoreResult.baseSeverity)})</span>
          </div>
        `);
        if (scoreResult.hasTemporalOrThreat && scoreResult.temporalScore !== undefined && scoreResult.temporalSeverity) {
          items.push(`
            <div class="subscore-item">
              <span class="subscore-label">Temporal Score</span>
              <span class="subscore-val">${scoreResult.temporalScore.toFixed(1)} (${escapeHtml(scoreResult.temporalSeverity)})</span>
            </div>
          `);
        }
        if (scoreResult.hasEnvironmental && scoreResult.environmentalScore !== undefined && scoreResult.environmentalSeverity) {
          items.push(`
            <div class="subscore-item">
              <span class="subscore-label">Environmental</span>
              <span class="subscore-val">${scoreResult.environmentalScore.toFixed(1)} (${escapeHtml(scoreResult.environmentalSeverity)})</span>
            </div>
          `);
        }
        breakdownHtml = `<div class="score-breakdown">${items.join('')}</div>`;
      }
    }

    let vectorStatusText = 'Awaiting complete Base metrics';
    let vectorStatusClass = '';
    if (isOutOfSync) {
      vectorStatusText = 'Invalid vector syntax';
      vectorStatusClass = 'is-invalid';
    } else if (scoreResult.isComplete) {
      vectorStatusText = 'Valid canonical vector';
      vectorStatusClass = 'is-valid';
    }

    const placeholderVec =
      state.version === '4.0'
        ? 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N'
        : state.version === '2.0'
          ? 'AV:N/AC:L/Au:N/C:P/I:P/A:P'
          : `CVSS:${state.version}/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`;

    let errorBoxHtml = '';
    if (state.editorError) {
      const crossVersionBtn =
        state.detectedOtherVersion && state.normalizedOtherVector
          ? `<a class="btn btn-primary" href="/v${escapeHtml(state.detectedOtherVersion)}?vector=${encodeURIComponent(state.normalizedOtherVector)}">Open in CVSS v${escapeHtml(state.detectedOtherVersion)} Calculator</a>`
          : '';
      errorBoxHtml = `
        <div class="vector-error-box" id="vector-error-box" role="alert">
          <div><strong>Validation Error:</strong> ${escapeHtml(state.editorError)}</div>
          <div class="vector-error-actions">
            ${crossVersionBtn}
            <button type="button" class="btn" id="revert-vector-btn">Revert to last valid vector</button>
          </div>
        </div>
      `;
    }

    const fallbackHtml = state.fallbackCopyValue
      ? `
        <div class="fallback-copy-box">
          <label for="fallback-copy-input">Clipboard access unavailable. Copy manually below:</label>
          <input id="fallback-copy-input" class="fallback-copy-input" type="text" readonly value="${escapeHtml(state.fallbackCopyValue)}" />
        </div>
      `
      : '';

    return `
      <aside class="score-column" aria-label="CVSS Score and Vector Panel">
        <div class="score-panel ${isOutOfSync ? 'is-out-of-sync' : ''}">
          <div class="score-header">
            <h2 class="score-header-title">CVSS v${escapeHtml(state.version)} Result</h2>
            ${syncBadgeHtml}
          </div>

          ${readoutHtml}
          ${breakdownHtml}

          <div class="vector-editor-block">
            <div class="vector-label-row">
              <label for="inline-vector-input" class="vector-label">Vector String (Inline Editor)</label>
              <span class="vector-status ${vectorStatusClass}" id="vector-status-label">${escapeHtml(vectorStatusText)}</span>
            </div>
            <input
              id="inline-vector-input"
              type="text"
              class="vector-input ${isOutOfSync ? 'is-invalid' : ''}"
              value="${escapeHtml(state.rawEditorText)}"
              placeholder="${escapeHtml(placeholderVec)}"
              spellcheck="false"
              autocomplete="off"
              autocapitalize="off"
              aria-invalid="${isOutOfSync ? 'true' : 'false'}"
              aria-describedby="vector-status-label"
            />
            ${errorBoxHtml}
          </div>

          <div class="action-grid">
            <button type="button" class="btn btn-primary" id="copy-vector-btn" ${!isActionable ? 'disabled' : ''}>
              Copy Vector
            </button>
            <button type="button" class="btn" id="copy-result-btn" ${!isActionable ? 'disabled' : ''}>
              Copy Result
            </button>
            <button type="button" class="btn btn-full" id="share-url-btn" ${!isActionable ? 'disabled' : ''}>
              Share URL (Copy Reproducible Link)
            </button>
          </div>

          <div class="copy-feedback" id="copy-feedback-status" role="status" aria-live="polite">${escapeHtml(state.feedbackMessage)}</div>
          ${fallbackHtml}

          <div class="reset-row">
            <button type="button" class="btn" id="score-reset-group-btn" ${isOutOfSync ? 'disabled' : ''}>
              Reset ${escapeHtml(activeGroup.label)}
            </button>
            <button type="button" class="btn" id="reset-all-btn">
              Reset All (v${escapeHtml(state.version)})
            </button>
          </div>
        </div>
      </aside>
    `;
  }

  async function copyTextWithFallback(text: string, successLabel: string): Promise<void> {
    state.fallbackCopyValue = null;
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(text);
        state.feedbackMessage = successLabel;
        renderAll();
        return;
      }
      throw new Error('Clipboard API unavailable');
    } catch {
      state.feedbackMessage = 'Clipboard blocked by browser. Select and copy the text below.';
      state.fallbackCopyValue = text;
      renderAll();
      const fallbackInput = document.getElementById('fallback-copy-input') as HTMLInputElement | null;
      fallbackInput?.focus();
      fallbackInput?.select();
    }
  }

  function handleMetricChange(key: string, val: string): void {
    if (state.editorError !== null) return;
    clearStaleUrlVectorParam(state);
    state.urlError = null;
    state.feedbackMessage = '';
    state.fallbackCopyValue = null;
    state.metrics[key] = val;

    const missing = getMissingBaseMetrics(state.version, state.metrics);
    if (missing.length === 0) {
      const canonical = serializeVector(state.version, state.metrics);
      state.lastValidVector = canonical;
      state.rawEditorText = canonical;
    } else {
      state.lastValidVector = '';
      state.rawEditorText = '';
    }
    saveDraftToSession(state);
    renderAll();
  }

  function handleResetGroup(): void {
    if (state.editorError !== null) return;
    clearStaleUrlVectorParam(state);
    state.urlError = null;
    state.feedbackMessage = `Reset ${state.activeTab} metrics.`;
    state.fallbackCopyValue = null;

    const group = state.schema.groups.find((g) => g.id === state.activeTab);
    if (!group) return;
    for (const m of group.metrics) {
      state.metrics[m.key] = m.defaultValue;
    }

    const missing = getMissingBaseMetrics(state.version, state.metrics);
    if (missing.length === 0) {
      const canonical = serializeVector(state.version, state.metrics);
      state.lastValidVector = canonical;
      state.rawEditorText = canonical;
    } else {
      state.lastValidVector = '';
      state.rawEditorText = '';
    }
    saveDraftToSession(state);
    renderAll();
  }

  function handleResetAll(): void {
    clearStaleUrlVectorParam(state);
    clearDraftFromSession(state.version);
    state.metrics = createInitialMetrics(state.version);
    state.rawEditorText = '';
    state.lastValidVector = '';
    state.editorError = null;
    state.detectedOtherVersion = null;
    state.normalizedOtherVector = null;
    state.urlError = null;
    state.feedbackMessage = `Cleared CVSS v${state.version} draft.`;
    state.fallbackCopyValue = null;
    renderAll();
  }

  function handleVectorInput(newText: string): void {
    clearStaleUrlVectorParam(state);
    state.urlError = null;
    state.feedbackMessage = '';
    state.fallbackCopyValue = null;
    state.rawEditorText = newText;

    const trimmed = newText.trim();
    if (!trimmed) {
      // Empty vector input clears error if no valid vector was committed, or marks incomplete
      state.editorError = 'Vector field is empty. Type or paste a valid vector, or click Revert.';
      state.detectedOtherVersion = null;
      state.normalizedOtherVector = null;
      saveDraftToSession(state);
      renderAllPreserveInputFocus();
      return;
    }

    const parsed = parseVector(state.version, trimmed);
    if (parsed.ok) {
      state.metrics = parsed.metrics;
      state.lastValidVector = parsed.canonicalVector;
      state.editorError = null;
      state.detectedOtherVersion = null;
      state.normalizedOtherVector = null;
      saveDraftToSession(state);
      renderAllPreserveInputFocus();
    } else {
      state.editorError = parsed.error;
      state.detectedOtherVersion = parsed.detectedOtherVersion ?? null;
      state.normalizedOtherVector = parsed.normalizedOtherVector ?? null;
      saveDraftToSession(state);
      renderAllPreserveInputFocus();
    }
  }

  function renderAllPreserveInputFocus(): void {
    const inputEl = document.getElementById('inline-vector-input') as HTMLInputElement | null;
    const selStart = inputEl?.selectionStart ?? null;
    const selEnd = inputEl?.selectionEnd ?? null;
    const wasFocused = document.activeElement === inputEl;

    renderAll();

    if (wasFocused) {
      const nextInput = document.getElementById('inline-vector-input') as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
        if (selStart !== null && selEnd !== null) {
          try {
            nextInput.setSelectionRange(selStart, selEnd);
          } catch {
            // ignore
          }
        }
      }
    }
  }

  function attachEventListeners(scoreResult: ScoreResult): void {
    if (!root) return;
    // Tab switching + keyboard arrow navigation
    const tabBtns = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    tabBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab-id');
        if (tabId) {
          state.activeTab = tabId;
          saveDraftToSession(state);
          renderAll();
        }
      });

      btn.addEventListener('keydown', (e: KeyboardEvent) => {
        let nextIdx: number | null = null;
        if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tabBtns.length;
        else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tabBtns.length) % tabBtns.length;
        else if (e.key === 'Home') nextIdx = 0;
        else if (e.key === 'End') nextIdx = tabBtns.length - 1;

        if (nextIdx !== null) {
          e.preventDefault();
          const targetTab = tabBtns[nextIdx];
          const tabId = targetTab.getAttribute('data-tab-id');
          if (tabId) {
            state.activeTab = tabId;
            saveDraftToSession(state);
            renderAll();
            const newlyRenderedTab = document.getElementById(`tab-${tabId}`);
            newlyRenderedTab?.focus();
          }
        }
      });
    });

    // Segmented buttons
    const segBtns = root.querySelectorAll<HTMLButtonElement>('.seg-btn');
    segBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-metric-key');
        const val = btn.getAttribute('data-metric-val');
        if (key && val !== null) {
          handleMetricChange(key, val);
        }
      });
    });

    // Select dropdowns
    const selects = root.querySelectorAll<HTMLSelectElement>('[data-metric-select]');
    selects.forEach((sel) => {
      sel.addEventListener('change', () => {
        const key = sel.getAttribute('data-metric-select');
        if (key) {
          handleMetricChange(key, sel.value);
        }
      });
    });

    // Inline vector input
    const vectorInput = document.getElementById('inline-vector-input') as HTMLInputElement | null;
    vectorInput?.addEventListener('input', () => {
      handleVectorInput(vectorInput.value);
    });
    vectorInput?.addEventListener('blur', () => {
      // On blur, if valid, normalize editor text to canonical vector
      if (state.editorError === null && state.lastValidVector) {
        state.rawEditorText = state.lastValidVector;
        saveDraftToSession(state);
        renderAll();
      }
    });

    // Revert invalid vector draft
    const revertBtn = document.getElementById('revert-vector-btn');
    revertBtn?.addEventListener('click', () => {
      state.rawEditorText = state.lastValidVector;
      state.editorError = null;
      state.detectedOtherVersion = null;
      state.normalizedOtherVector = null;
      state.urlError = null;
      saveDraftToSession(state);
      renderAll();
    });

    // Copy / Share / Reset buttons
    const copyVectorBtn = document.getElementById('copy-vector-btn');
    copyVectorBtn?.addEventListener('click', () => {
      if (scoreResult.isComplete && state.editorError === null) {
        void copyTextWithFallback(scoreResult.canonicalVector, 'Copied canonical vector to clipboard.');
      }
    });

    const copyResultBtn = document.getElementById('copy-result-btn');
    copyResultBtn?.addEventListener('click', () => {
      if (scoreResult.isComplete && state.editorError === null) {
        const summary = formatResultSummary(scoreResult);
        void copyTextWithFallback(summary, 'Copied score result to clipboard.');
      }
    });

    const shareUrlBtn = document.getElementById('share-url-btn');
    shareUrlBtn?.addEventListener('click', () => {
      if (scoreResult.isComplete && state.editorError === null) {
        // Share on Demand: construct reproducible URL without mutating window.location
        const shareUrl = `${window.location.origin}/v${state.version}?vector=${encodeURIComponent(scoreResult.canonicalVector)}`;
        void copyTextWithFallback(shareUrl, 'Copied reproducible Share URL to clipboard.');
      }
    });

    const resetGroupBtn = document.getElementById('reset-group-btn');
    const scoreResetGroupBtn = document.getElementById('score-reset-group-btn');
    resetGroupBtn?.addEventListener('click', handleResetGroup);
    scoreResetGroupBtn?.addEventListener('click', handleResetGroup);

    const resetAllBtn = document.getElementById('reset-all-btn');
    resetAllBtn?.addEventListener('click', handleResetAll);
  }

  function renderAll(): void {
    if (!root) return;
    updateUrlErrorBanner();
    const scoreResult = calculateScore(state.version, state.metrics);
    root.innerHTML = `
      <div class="calc-grid">
        ${renderMetricsColumn()}
        ${renderScorePanel(scoreResult)}
      </div>
    `;
    attachEventListeners(scoreResult);
  }

  renderAll();
}

initCalculator();
