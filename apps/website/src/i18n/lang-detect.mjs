// Shared first-visit language detection for the static site.
// English is the default. Indonesian is auto-selected when the browser
// reports an Indonesian language tag and the visitor has not chosen English.
export const langDetectScript = String.raw`
(function () {
  var path = window.location.pathname;
  if (path === '/id' || path.indexOf('/id/') === 0) return;

  var translatable =
    path === '/' ||
    path === '/tools/mcp' ||
    path === '/tools/mcp/' ||
    path === '/docs' ||
    path.indexOf('/docs/') === 0;
  if (!translatable) return;

  var key = 'cvss-lang';
  var stored = null;
  try {
    stored = localStorage.getItem(key);
  } catch (_) {
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var override = params.get('lang');
  if (override === 'en' || override === 'id') {
    stored = override;
    try {
      localStorage.setItem(key, override);
    } catch (_) {}
  }

  if (stored === 'en') return;
  if (stored !== 'id') {
    var languages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ''];
    var prefersIndonesian = languages.some(function (value) {
      var tag = String(value).toLowerCase();
      return tag === 'id' || tag.indexOf('id-') === 0;
    });
    if (!prefersIndonesian) return;
  }

  var target = '/id' + (path === '/' ? '/' : path);
  window.location.replace(target + window.location.search + window.location.hash);
})();
`;
