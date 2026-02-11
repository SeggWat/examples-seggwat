# SeggWat Next.js Example

Integrate the [SeggWat](https://seggwat.com) feedback widget into a **Next.js 15** App Router project.

## Quick Start

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

The widget is loaded via `next/script` in `app/layout.tsx` with the `afterInteractive` strategy, so it persists across route changes:

```tsx
import Script from 'next/script'

<Script
  src="https://seggwat.com/static/widgets/v1/seggwat-feedback.js"
  data-project-key="YOUR_PROJECT_KEY"
  data-button-color="#000000"
  data-enable-screenshots="true"
  strategy="afterInteractive"
/>
```

Interactive controls live in `app/page.tsx` (a Client Component with `'use client'`).

## Configuration Attributes

| Attribute | Description | Default |
|---|---|---|
| `data-project-key` | Your project UUID (required) | — |
| `data-button-color` | Hex color for the button | `#000000` |
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
