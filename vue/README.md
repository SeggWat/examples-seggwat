# SeggWat Vue Example

Integrate the [SeggWat](https://seggwat.com) feedback widget into a **Vue 3** + Vite app using the Composition API.

## Quick Start

```bash
bun install
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How It Works

The widget is loaded via a script tag in `index.html`:

```html
<script defer
  src="https://seggwat.com/static/widgets/v1/seggwat-feedback.js"
  data-project-key="YOUR_PROJECT_KEY"
  data-button-color="#42b883"
  data-enable-screenshots="true">
</script>
```

Interactive controls use Vue 3's `<script setup>` with `ref()` for reactive state in `src/App.vue`.

## Configuration Attributes

| Attribute | Description | Default |
|---|---|---|
| `data-project-key` | Your project UUID (required) | — |
| `data-button-color` | Hex color for the button | `#42b883` |
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
