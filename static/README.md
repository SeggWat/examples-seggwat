# Plain HTML Feedback Widget Example — SeggWat

Add a **feedback widget to a plain HTML or static site** with one script tag — collect bug reports, feature requests, and **annotated screenshots** with zero dependencies, no build tools, and no framework. This page showcases every SeggWat widget type, powered by [SeggWat](https://seggwat.com).

## Usage

1. Open `index.html` in your browser.
2. Replace `demo-project-key` with your real project key from the [SeggWat dashboard](https://seggwat.com).

## What's included

- **Feedback button** — floating button with a hub modal (bug / feature / review / contact flows), screenshot capture and annotation, and customizable position, color, and language
- **Helpful rating** — inline thumbs up / down widget for "was this page helpful?"
- **Star / smiley rating** — inline 1–5 rating with an optional smiley variant
- **Configuration reference** — an on-page table of every `data-*` attribute

## Widget script URLs

| Widget | Script URL |
|--------|-----------|
| Feedback button | `https://seggwat.com/static/widgets/v1/seggwat-feedback.js` |
| Helpful rating | `https://seggwat.com/static/widgets/v1/seggwat-helpful.js` |
| Star / smiley rating | `https://seggwat.com/static/widgets/v1/seggwat-rating.js` |

## Requirements

- An internet connection (the widget script and CSS load from the SeggWat CDN)
- A SeggWat project key for real submissions

## Customization

Edit the `<script>` tags at the bottom of `index.html` to change widget settings. See the configuration reference table on the page for all available attributes. To switch the feedback widget's language at runtime, call `window.SeggwatFeedback.destroy()` and re-inject the script with a new `data-language` (the page's language buttons demonstrate this).

## Other framework examples

[React](../react/) · [Next.js](../nextjs/) · [Vue](../vue/) · [Astro](../astro/)

## Learn more

- [Widget installation guide](https://seggwat.com/docs/widget/installation)
- [SeggWat documentation](https://seggwat.com/docs)

[SeggWat](https://seggwat.com) is a lightweight feedback platform for product teams — collect and triage bug reports, feature requests, and ratings from any web or mobile app.
