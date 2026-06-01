# React Feedback Widget Example — SeggWat

Add an in-app **feedback widget to your React app** with a single script tag — collect bug reports, feature requests, and **annotated screenshots** without an npm package or any backend code. This example uses React 18 + Vite + TypeScript and the [SeggWat](https://seggwat.com) feedback widget.

## What this example shows

- **Script-tag integration** — no npm dependency, works with any React setup
- **Full TypeScript declarations** for every widget API (`src/seggwat.d.ts`)
- **Screenshot capture and annotation** for visual bug reports
- **User identification** to attach feedback to a known user
- Dynamic color and position, runtime language switching, and programmatic open/close control

## Quick start

### 1. Install dependencies

```bash
bun install
```

### 2. Add your project key

Edit `index.html` and replace `demo-project-key` with your SeggWat project key:

```html
<script defer
  src="https://seggwat.com/static/widgets/v1/seggwat-feedback.js"
  data-project-key="YOUR_PROJECT_KEY"
  data-button-color="#61dafb"
  data-enable-screenshots="true">
</script>
```

### 3. Run the dev server

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production

```bash
bun run build
```

## How it works

The widget loads via a `<script>` tag in `index.html`, so it persists across React route changes without re-mounting. No React component wraps it — it lives outside the React tree and talks to your app through the global `window.SeggwatFeedback` API.

### Widget script URLs

| Widget | Script URL |
|--------|-----------|
| Feedback button | `https://seggwat.com/static/widgets/v1/seggwat-feedback.js` |
| Helpful rating (thumbs up/down) | `https://seggwat.com/static/widgets/v1/seggwat-helpful.js` |
| Star / smiley rating | `https://seggwat.com/static/widgets/v1/seggwat-rating.js` |

### Configuration attributes

| Attribute | Description | Values |
|-----------|-------------|--------|
| `data-project-key` | Project key (required) | UUID from the dashboard |
| `data-button-color` | Button / modal accent color | Hex color, e.g. `#61dafb` |
| `data-button-position` | Button layout | `bottom-right`, `right-side`, `icon-only` |
| `data-language` | UI language | `en`, `de`, `sv`, `fr` (auto-detect by default) |
| `data-enable-screenshots` | Screenshot support (desktop only) | `true` / `false` |
| `data-version` | App version tag | e.g. `1.2.3` |
| `data-show-powered-by` | Branding label | `true` / `false` |

### JavaScript API

```typescript
// Live appearance: color / position / button text (not language)
window.SeggwatFeedback?.updateAppearance({
  color: '#ef4444',
  position: 'icon-only'
})

// Programmatic control
window.SeggwatFeedback?.open()
window.SeggwatFeedback?.close()

// Screenshots
window.SeggwatFeedback?.captureScreenshot()
window.SeggwatFeedback?.screenshotsEnabled // read-only boolean

// User identification (optional email pre-fills the form)
window.SeggwatFeedback?.setUser('user-123', 'user@example.com')
```

### Switching language at runtime

The UI language is loaded once when the widget initializes (from `data-language`), so it can't be changed through `updateAppearance`. To switch it live, call `window.SeggwatFeedback.destroy()` and re-inject the script with a new `data-language`. See `src/App.tsx` (`updateLanguage`) for the working pattern.

### TypeScript support

Type declarations for all widget globals live in `src/seggwat.d.ts`:

- `window.SeggwatFeedback` — feedback button API
- `window.SeggwatHelpful` — helpful rating API
- `window.SeggwatRating` — star / smiley rating API

## Available scripts

- `bun run dev` — start the development server
- `bun run build` — build for production
- `bun run preview` — preview the production build

## Other framework examples

[Plain HTML](../static/) · [Next.js](../nextjs/) · [Vue](../vue/) · [Astro](../astro/)

## Learn more

- [Widget installation guide](https://seggwat.com/docs/widget/installation)
- [SeggWat documentation](https://seggwat.com/docs)

[SeggWat](https://seggwat.com) is a lightweight feedback platform for product teams — collect and triage bug reports, feature requests, and ratings from any web or mobile app.
