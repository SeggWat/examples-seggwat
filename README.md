# SeggWat Widget Examples

Example integrations of the [SeggWat](https://seggwat.com) feedback widget across popular frameworks. Each example demonstrates the same feature set:

- Dynamic color, position, and language switching
- Programmatic open/close control
- Screenshot capture
- User identification

## Examples

| Directory | Framework | Setup |
|---|---|---|
| [`static/`](static/) | Plain HTML | Open `index.html` in a browser |
| [`react/`](react/) | React 18 + Vite | `bun install && bun run dev` |
| [`nextjs/`](nextjs/) | Next.js 15 (App Router) | `bun install && bun run dev` |
| [`vue/`](vue/) | Vue 3 + Vite | `bun install && bun run dev` |
| [`astro/`](astro/) | Astro 5 | `bun install && bun run dev` |

## Per-Framework READMEs

- [`static/README.md`](static/README.md)
- [`react/README.md`](react/README.md)
- [`nextjs/README.md`](nextjs/README.md)
- [`vue/README.md`](vue/README.md)
- [`astro/README.md`](astro/README.md)

## Quick Start

Pick any example, install dependencies, and run the dev server:

```bash
cd react    # or nextjs, vue, astro
bun install
bun run dev
```

All examples use `demo-project-key` as a placeholder. Replace it with your project key from the [SeggWat dashboard](https://seggwat.com) for production use.

## Widget Script

Every framework loads the same script tag — only the integration pattern differs:

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
// Customize appearance
window.SeggwatFeedback?.updateAppearance({
  color: '#ef4444',
  position: 'icon-only',
  language: 'de'
})

// Programmatic control
window.SeggwatFeedback?.open()
window.SeggwatFeedback?.close()
window.SeggwatFeedback?.captureScreenshot()

// User identification
window.SeggwatFeedback?.setUser('user-123')
```

## Documentation

- [Widget Installation](https://seggwat.com/docs/widget/installation)
- [Widget API Reference](https://seggwat.com/docs/widget/api)
