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

## Microsoft integration notes

This frontend is static-exported. For contact mail delivery through Microsoft Graph:

- Use a secure external backend endpoint (Azure Function / API) and set `NEXT_PUBLIC_CONTACT_API_URL`.
- Configure Teams Live Chat widget values in public env vars for the `Chat with us` button.

Use `.env.example` as the template and see:

- `docs/microsoft-integrations.md`
