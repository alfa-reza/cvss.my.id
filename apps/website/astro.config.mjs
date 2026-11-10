import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { langDetectScript } from './src/i18n/lang-detect.mjs';

const languagePreferenceScript = `
  document.addEventListener('change', function (event) {
    var target = event.target;
    if (!(target instanceof HTMLSelectElement) || !target.closest('starlight-lang-select')) return;
    var value = target.value || '';
    var lang = value === '/id' || value.indexOf('/id/') === 0 ? 'id' : 'en';
    try {
      localStorage.setItem('cvss-lang', lang);
    } catch (_) {}
  });
`;

export default defineConfig({
  site: 'https://cvss.my.id',
  output: 'static',
  integrations: [
    starlight({
      title: 'CVSS.my.id',
      description: 'Practical CVSS 2.0, 3.0, 3.1, and 4.0 reference documentation and MCP server setup guides.',
      routeMiddleware: './src/routeData.ts',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        id: { label: 'Indonesia', lang: 'id' },
      },
      disable404Route: false,
      social: {
        github: 'https://github.com/alfa-reza/cvss.my.id',
      },
      editLink: {
        baseUrl: 'https://github.com/alfa-reza/cvss.my.id/edit/main/apps/website/',
      },
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      customCss: ['./src/styles/starlight-custom.css'],
      head: [
        { tag: 'link', attrs: { rel: 'icon', href: '/favicon-48.png', type: 'image/png', sizes: '48x48' } },
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon.ico',
            sizes: 'any',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'apple-touch-icon',
            href: '/apple-touch-icon.png',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#0c0d0f',
          },
        },
        {
          tag: 'script',
          content: langDetectScript,
        },
        {
          tag: 'script',
          content: languagePreferenceScript,
        },
      ],
      sidebar: [
        {
          label: 'Start Here',
          translations: { id: 'Mulai di Sini' },
          items: [
            {
              label: 'Documentation Overview',
              translations: { id: 'Ikhtisar Dokumentasi' },
              link: '/docs/',
            },
            {
              label: 'Getting Started',
              translations: { id: 'Memulai' },
              link: '/docs/getting-started/',
            },
            {
              label: 'Using the Calculator',
              translations: { id: 'Menggunakan Kalkulator' },
              link: '/docs/calculator/',
            },
          ],
        },
        {
          label: 'CVSS Reference',
          translations: { id: 'Referensi CVSS' },
          items: [
            {
              label: 'CVSS Overview',
              translations: { id: 'Ikhtisar CVSS' },
              link: '/docs/cvss/overview/',
            },
            {
              label: 'CVSS v4.0 Specification Guide',
              translations: { id: 'Panduan Spesifikasi CVSS v4.0' },
              link: '/docs/cvss/v4/',
            },
            {
              label: 'CVSS v3.1 Specification Guide',
              translations: { id: 'Panduan Spesifikasi CVSS v3.1' },
              link: '/docs/cvss/v3.1/',
            },
            {
              label: 'CVSS v3.0 Specification Guide',
              translations: { id: 'Panduan Spesifikasi CVSS v3.0' },
              link: '/docs/cvss/v3.0/',
            },
            {
              label: 'CVSS v2.0 Specification Guide',
              translations: { id: 'Panduan Spesifikasi CVSS v2.0' },
              link: '/docs/cvss/v2/',
            },
            {
              label: 'Base Metric Keys & Severity Ranges',
              translations: { id: 'Kunci Metrik Base & Rentang Tingkat Keparahan' },
              link: '/docs/cvss/metric-keys/',
            },
            {
              label: 'CVSS Metric Glossary',
              translations: { id: 'Glosarium Metrik CVSS' },
              link: '/docs/cvss/metric-glossary/',
            },
            {
              label: 'Vector String Format & Rules',
              translations: { id: 'Format & Aturan Vector String' },
              link: '/docs/cvss/vectors/',
            },
            {
              label: 'Reproducible Examples',
              translations: { id: 'Contoh yang Dapat Direproduksi' },
              link: '/docs/cvss/examples/',
            },
          ],
        },
        {
          label: 'MCP Server for AI Agents',
          translations: { id: 'Server MCP untuk Agen AI' },
          items: [
            {
              label: 'MCP Overview',
              translations: { id: 'Ikhtisar MCP' },
              link: '/docs/mcp/',
            },
            {
              label: 'Local MCP (stdio)',
              translations: { id: 'MCP Lokal (stdio)' },
              link: '/docs/mcp/local/',
            },
            {
              label: 'Remote MCP (Streamable HTTP)',
              translations: { id: 'MCP Jarak Jauh (Streamable HTTP)' },
              link: '/docs/mcp/remote/',
            },
            {
              label: 'Tool Reference (calculate_cvss)',
              translations: { id: 'Referensi Alat (calculate_cvss)' },
              link: '/docs/mcp/tools/',
            },
            {
              label: 'Security & Privacy',
              translations: { id: 'Keamanan & Privasi' },
              link: '/docs/mcp/security/',
            },
          ],
        },
        {
          label: 'MCP Client Setup Guides',
          translations: { id: 'Panduan Penyiapan Klien MCP' },
          items: [
            {
              label: 'Client Setup Guides',
              translations: { id: 'Panduan Penyiapan Klien' },
              link: '/docs/mcp/clients/',
            },
            { label: 'Codex', link: '/docs/mcp/clients/codex/' },
            { label: 'Claude Code', link: '/docs/mcp/clients/claude-code/' },
            { label: 'OpenCode v2', link: '/docs/mcp/clients/opencode/' },
            { label: 'GitHub Copilot', link: '/docs/mcp/clients/github-copilot/' },
            { label: 'Cursor', link: '/docs/mcp/clients/cursor/' },
            { label: 'VS Code', link: '/docs/mcp/clients/vscode/' },
            { label: 'Zed', link: '/docs/mcp/clients/zed/' },
            { label: 'Gemini CLI', link: '/docs/mcp/clients/gemini-cli/' },
            { label: 'JetBrains', link: '/docs/mcp/clients/jetbrains/' },
            { label: 'Claude Desktop', link: '/docs/mcp/clients/claude-desktop/' },
            { label: 'Kilo Code', link: '/docs/mcp/clients/kilo-code/' },
            { label: 'Cline', link: '/docs/mcp/clients/cline/' },
            { label: 'Hermes Agent', link: '/docs/mcp/clients/hermes-agent/' },
          ],
        },
      ],
    }),
  ],
});
