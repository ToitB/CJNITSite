# CJN IT Solutions Website (Next.js)

This project has been migrated from Vite to Next.js and is configured for static export, which is ideal for Hostinger shared hosting.

## Local development

1. Install dependencies:
`npm install`
2. Start dev server:
`npm run dev`
3. Open:
`http://localhost:5173`

## Production build

Run:
`npm run build`

This generates a fully static site in `out/`.

## Deploy to Hostinger (shared hosting)

1. Run `npm run build`
2. Upload the contents of `out/` to your Hostinger `public_html` directory
3. Ensure `index.html` from `out/` is at the root of `public_html`

No Node.js runtime is required for this deployment mode.
