# SeggWat Widget Examples — In-App Feedback Widget for React, Vue, Next.js, Astro & Plain HTML

Production-ready example integrations of the [SeggWat](https://seggwat.com) **feedback widget** across popular frameworks. Add in-app bug reports, feature requests, and **annotated screenshots** to any web app with a single `<script>` tag — no npm package, no build step, no backend code.

Each example demonstrates the same feature set:

- **Bug reports & feature requests** collected in context, on the page where they happen
- **Screenshot capture and annotation** for high-signal visual feedback
- **User identification** so feedback isn't anonymous guesswork
- **Version tracking** to tie regressions to a specific release
- Dynamic color and position, runtime language switching, and programmatic open/close control

## Examples

| Directory | Framework | Setup | Guide |
|---|---|---|---|
| [`static/`](static/) | Plain HTML / static site | Open `index.html` in a browser | [README](static/README.md) |
| [`react/`](react/) | React 18 + Vite + TypeScript | `bun install && bun run dev` | [README](react/README.md) |
| [`nextjs/`](nextjs/) | Next.js 15 (App Router) | `bun install && bun run dev` | [README](nextjs/README.md) |
| [`vue/`](vue/) | Vue 3 + Vite (Composition API) | `bun install && bun run dev` | [README](vue/README.md) |
| [`astro/`](astro/) | Astro 5 | `bun install && bun run dev` | [README](astro/README.md) |

## Quick start

Pick any example, install dependencies, and run the dev server:

```bash
cd react    # or nextjs, vue, astro
bun install
bun run dev
```

All examples use `demo-project-key` as a placeholder. Replace it with your real project key from the [SeggWat dashboard](https://seggwat.com) before going to production.

## One script tag, every framework

Every framework loads the same widget script — only the integration pattern differs:

```html
<script defer
  src="https://seggwat.com/static/widgets/v1/seggwat-feedback.js"
  data-project-key="YOUR_PROJECT_KEY"
  data-button-color="#3b82f6"
  data-enable-screenshots="true">
</script>
```

## JavaScript API

All examples use the same runtime API:

```javascript
// Live appearance: color / position / button text (not language)
window.SeggwatFeedback?.updateAppearance({
  color: '#ef4444',
  position: 'icon-only'
})

// Programmatic control
window.SeggwatFeedback?.open()
window.SeggwatFeedback?.close()
window.SeggwatFeedback?.captureScreenshot()

// User identification (optional email pre-fills the form)
window.SeggwatFeedback?.setUser('user-123', 'user@example.com')
```

> **Switching language at runtime?** The UI language is loaded once at init from `data-language`, so it can't be changed through `updateAppearance`. To switch it live, call `window.SeggwatFeedback.destroy()` and re-inject the script with a new `data-language` — each example demonstrates this pattern.

## Documentation

- [Widget installation guide](https://seggwat.com/docs/widget/installation)
- [Widget API reference](https://seggwat.com/docs/widget/api)
- [SeggWat documentation](https://seggwat.com/docs)

## About SeggWat

[SeggWat](https://seggwat.com) is a lightweight feedback collection platform for product teams. Embed a feedback button, helpful/thumbs rating, star or NPS-style surveys on any site, then triage bug reports and feature requests from the dashboard, API, MCP server, or iOS app. [Start collecting feedback →](https://seggwat.com)
