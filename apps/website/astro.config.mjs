import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://cvss.my.id',
  output: 'static',
  integrations: [
    starlight({
      title: 'CVSS.my.id',
      description: 'Practical CVSS 2.0, 3.0, 3.1, and 4.0 reference documentation and MCP server setup guides.',
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
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#0c0d0f',
          },
        },
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Documentation Overview', link: '/docs/' },
            { label: 'Getting Started', link: '/docs/getting-started/' },
            { label: 'Using the Calculator', link: '/docs/calculator/' },
          ],
        },
        {
          label: 'CVSS Reference',
          items: [
            { label: 'CVSS Overview', link: '/docs/cvss/overview/' },
            { label: 'CVSS v4.0 Specification Guide', link: '/docs/cvss/v4/' },
            { label: 'CVSS v3.1 Specification Guide', link: '/docs/cvss/v3.1/' },
            { label: 'CVSS v3.0 Specification Guide', link: '/docs/cvss/v3.0/' },
            { label: 'CVSS v2.0 Specification Guide', link: '/docs/cvss/v2/' },
            { label: 'Vector String Format & Rules', link: '/docs/cvss/vectors/' },
            { label: 'Reproducible Examples', link: '/docs/cvss/examples/' },
          ],
        },
        {
          label: 'MCP Server for AI Agents',
          items: [
            { label: 'MCP Overview', link: '/docs/mcp/' },
            { label: 'Local MCP (stdio)', link: '/docs/mcp/local/' },
            { label: 'Remote MCP (Streamable HTTP)', link: '/docs/mcp/remote/' },
            { label: 'Tool Reference (calculate_cvss)', link: '/docs/mcp/tools/' },
            { label: 'Security & Privacy', link: '/docs/mcp/security/' },
          ],
        },
        {
          label: 'MCP Client Setup Guides',
          items: [
            { label: 'Client Setup Guides', link: '/docs/mcp/clients/' },
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
