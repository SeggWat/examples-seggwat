# Astro Feedback Widget Example — SeggWat

Add an in-app **feedback widget to your Astro site** with one script tag — collect bug reports, feature requests, and **annotated screenshots** with no npm package and no backend code. This example uses **Astro 5** with zero framework dependencies and the [SeggWat](https://seggwat.com) feedback widget.

## What this example shows

- **`<script is:inline>` integration** so Astro never bundles or transforms the widget
- **Screenshot capture and annotation** for visual bug reports
- **User identification** to attach feedback to a known user
- Vanilla-JS controls with event delegation: color, position, runtime language switching, and programmatic open/close

## Quick start

```bash
bun install
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Add the widget to Astro

The widget loads via `<script is:inline>` in `src/layouts/Layout.astro` so Astro doesn't bundle it:

```html
<script is:inline defer
  src="https://seggwat.com/static/widgets/v1/seggwat-feedback.js"
  data-project-key="YOUR_PROJECT_KEY"
  data-button-color="#ff5d01"
  data-enable-screenshots="true"></script>
```

Interactive controls in `src/pages/index.astro` use vanilla JavaScript with event delegation.

## Configuration attributes

| Attribute | Description | Default |
|---|---|---|
| `data-project-key` | Your project UUID (required) | — |
| `data-button-color` | Button / modal accent color (hex) | `#ff5d01` |
| `data-button-position` | `bottom-right`, `right-side`, or `icon-only` | `bottom-right` |
| `data-language` | `en`, `de`, `sv`, or `fr` | auto-detect |
| `data-enable-screenshots` | Enable screenshot capture (desktop only) | `false` |

## JavaScript API

```typescript
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

### Switching language at runtime

The UI language is loaded once at init from `data-language`, so it can't be changed via `updateAppearance`. To switch it live, call `window.SeggwatFeedback.destroy()` and re-inject the script with a new `data-language`. See `src/pages/index.astro` (the language click handler) for the working pattern.

## Build

```bash
bun run build
```

## Other framework examples

[Plain HTML](../static/) · [React](../react/) · [Next.js](../nextjs/) · [Vue](../vue/)

## Learn more

- [Widget installation guide](https://seggwat.com/docs/widget/installation)
- [SeggWat documentation](https://seggwat.com/docs)

[SeggWat](https://seggwat.com) is a lightweight feedback platform for product teams — collect and triage bug reports, feature requests, and ratings from any web or mobile app.
