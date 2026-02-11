# SeggWat Astro Example

Integrate the [SeggWat](https://seggwat.com) feedback widget into an **Astro 5** site with zero framework dependencies.

## Quick Start

```bash
bun install
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## How It Works

The widget is loaded via `<script is:inline>` in `src/layouts/Layout.astro` to prevent Astro from bundling it:

```html
<script is:inline defer
  src="https://seggwat.com/static/widgets/v1/seggwat-feedback.js"
  data-project-key="YOUR_PROJECT_KEY"
  data-button-color="#ff5d01"
  data-enable-screenshots="true"></script>
```

Interactive controls in `src/pages/index.astro` use vanilla JavaScript with event delegation.

## Configuration Attributes

| Attribute | Description | Default |
|---|---|---|
| `data-project-key` | Your project UUID (required) | — |
| `data-button-color` | Hex color for the button | `#ff5d01` |
| `data-button-position` | `bottom-right`, `right-side`, or `icon-only` | `bottom-right` |
| `data-language` | `en`, `de`, or `sv` | `en` |
| `data-enable-screenshots` | Enable screenshot capture | `false` |

## JavaScript API

```typescript
// Update appearance
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

## Build

```bash
bun run build
```
