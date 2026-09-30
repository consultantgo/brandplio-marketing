# Brandplio marketing site

Static marketing site for Brandplio — no build step. Plain HTML, CSS, and a single
ES module.

## Structure

- `index.html` — home
- `product/` — product walkthrough
- `developers/` — developer / API page
- `styles/` — design tokens + per-page CSS
- `scripts/main.js` — interactions (theme toggle, tabs, copy buttons)

## Local preview

Serve the folder with any static server, e.g.:

```sh
python -m http.server 8000
```

Then open http://localhost:8000/.

## Deployment

Published via GitHub Pages (deploy from the `main` branch, root) to
[brandplio.com](https://brandplio.com/). `CNAME` holds the custom domain and
`.nojekyll` disables Jekyll processing.
