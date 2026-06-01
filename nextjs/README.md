# Next.js Feedback Widget Example — SeggWat

Add an in-app **feedback widget to your Next.js app** with one script tag — collect bug reports, feature requests, and **annotated screenshots** with no npm package and no backend code. This example uses the **Next.js 15 App Router** and the [SeggWat](https://seggwat.com) feedback widget.

## What this example shows

- **`next/script` integration** with the `afterInteractive` strategy — zero impact on Core Web Vitals
- **Works with static export and the Edge runtime** (the widget loads client-side from a CDN)
- **Screenshot capture and annotation** for visual bug reports
- **User identification** and runtime appearance/language switching from a Client Component

## Quick start

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Add the widget to Next.js

The widget loads via `next/script` in `app/layout.tsx` with the `afterInteractive` strategy, so it persists across route changes:

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

## Configuration attributes

| Attribute | Description | Default |
|---|---|---|
| `data-project-key` | Your project UUID (required) | — |
| `data-button-color` | Button / modal accent color (hex) | `#000000` |
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

The UI language is loaded once at init from `data-language`, so it can't be changed via `updateAppearance`. To switch it live, call `window.SeggwatFeedback.destroy()` and re-inject the script with a new `data-language`. See `app/page.tsx` (`updateLanguage`) for the working pattern.

## Build

```bash
bun run build
```

## Other framework examples

[Plain HTML](../static/) · [React](../react/) · [Vue](../vue/) · [Astro](../astro/)

## Learn more

- [Widget installation guide](https://seggwat.com/docs/widget/installation)
- [SeggWat documentation](https://seggwat.com/docs)

[SeggWat](https://seggwat.com) is a lightweight feedback platform for product teams — collect and triage bug reports, feature requests, and ratings from any web or mobile app.
