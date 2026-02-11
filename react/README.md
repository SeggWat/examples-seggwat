# SeggWat React Example

Demonstrates how to integrate SeggWat feedback widgets into a React + Vite + TypeScript application.

## Features

- Script tag integration (no npm package)
- Full TypeScript declarations for all widget APIs
- Dynamic customization (color, position, language)
- Programmatic open/close control
- Screenshot capture and annotation
- User identification

## Quick Start

### 1. Install dependencies

```bash
bun install
```

### 2. Update the project key

Edit `index.html` and replace `demo-project-key` with your SeggWat project key:

```html
<script defer
  src="https://seggwat.com/static/widgets/v1/seggwat-feedback.js"
  data-project-key="YOUR_PROJECT_KEY"
  data-button-color="#61dafb"
  data-enable-screenshots="true">
</script>
```

### 3. Run the development server

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production

```bash
bun run build
```

## How It Works

The widget loads via a `<script>` tag in `index.html`, so it persists across React route changes without re-mounting.

### Modular Widget URLs

| Widget | Script URL |
|--------|-----------|
| Feedback Button | `https://seggwat.com/static/widgets/v1/seggwat-feedback.js` |
| Helpful Rating | `https://seggwat.com/static/widgets/v1/seggwat-helpful.js` |
| Star Rating | `https://seggwat.com/static/widgets/v1/seggwat-star.js` |
| Contact Form | `https://seggwat.com/static/widgets/v1/seggwat-contact.js` |

### Configuration Attributes

| Attribute | Description | Values |
|-----------|-------------|--------|
| `data-project-key` | Project key (required) | UUID from dashboard |
| `data-button-color` | Button color | Hex color, e.g. `#61dafb` |
| `data-button-position` | Button layout | `bottom-right`, `right-side`, `icon-only` |
| `data-language` | UI language | `en`, `de`, `sv` (auto-detect by default) |
| `data-enable-screenshots` | Screenshot support | `true` / `false` |
| `data-version` | App version tag | e.g. `1.2.3` |
| `data-show-powered-by` | Branding label | `true` / `false` |

### JavaScript API

```typescript
// Update appearance dynamically
window.SeggwatFeedback?.updateAppearance({
  color: '#ef4444',
  position: 'icon-only',
  language: 'de'
})

// Programmatic control
window.SeggwatFeedback?.open()
window.SeggwatFeedback?.close()

// Screenshots
window.SeggwatFeedback?.captureScreenshot()
window.SeggwatFeedback?.screenshotsEnabled // read-only boolean

// User identification
window.SeggwatFeedback?.setUser('user-123')
```

### TypeScript Support

Type declarations for all widget globals are in `src/seggwat.d.ts`:

- `window.SeggwatFeedback` — Feedback button API
- `window.SeggwatHelpful` — Helpful rating API
- `window.SeggwatStar` — Star rating API
- `window.SeggwatContact` — Contact form API

## Available Scripts

- `bun run dev` — Start development server
- `bun run build` — Build for production
- `bun run preview` — Preview production build

## Learn More

- [Widget Installation](https://seggwat.com/docs/widget/installation)
- [Full Documentation](https://seggwat.com/docs)
