# Security + Reliability Audit TODO (Practical)

Date: 2026-02-13  
Scope: Current Next.js static-export site (`output: 'export'`) targeting Hostinger.

## Current findings (factual)

1. Dependency audit:
   - `npm audit --omit=dev` returns **0 known production vulnerabilities**.
   - Outdated packages exist:
     - `lucide-react` patch update available
     - `eslint` major update available (tooling only)

2. Hosting/runtime model:
   - Site is static-exported (`next.config.mjs` uses `output: 'export'`), so secure headers cannot be enforced via Next middleware at runtime.
   - Security headers must be set at Hostinger edge/web-server layer.

3. Transport/security warning:
   - Dev/build output repeatedly shows `NODE_TLS_REJECT_UNAUTHORIZED=0` warning.
   - This disables TLS certificate verification and is unsafe if used in any non-local context.

4. Contact flow:
   - Contact form posts to external endpoint (`NEXT_PUBLIC_CONTACT_API_URL`), which is correct for static hosting.
   - Anti-abuse controls are not yet present client-side (honeypot/rate-limit signal/CAPTCHA token).

5. Teams chat:
   - Widget script URL is env-driven and loaded dynamically.
   - No explicit allowlist validation of script origin in frontend config docs yet.

6. Accessibility and interaction safety:
   - Full-screen menu has no explicit `Esc` close handler.
   - No focus trap is implemented while the menu overlay is open.
   - Icon-only nav buttons need explicit `aria-label` hardening.

7. SEO/discoverability scaffolding:
   - `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` are not present.

8. Embedded third-party content:
   - Google Maps iframe is present; sandbox/referrer tightening can be improved further.

9. OneDrive repository integration:
   - Resources Hub now supports env/API-driven repository URL resolution.
   - Backend requirements must enforce trusted URLs and read-only link policy.

## Prioritized TODO (before production launch)

## P0 (must do before public launch)

1. Remove unsafe TLS override from all environments:
   - Ensure `NODE_TLS_REJECT_UNAUTHORIZED` is not set to `0` in shell/profile/CI/Hostinger build hooks.

2. Enforce security headers at Hostinger:
   - Add CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options` (or CSP `frame-ancestors`) at web-server level.
   - Include allowed sources for Teams widget + map embed.

3. Lock down contact API backend (Graph mail endpoint):
   - Strict CORS allowlist to site origin only.
   - Server-side input validation (Zod equivalent).
   - Rate limiting + bot mitigation.
   - Secret storage in server environment only.
   - Structured request logging + alerting.

4. Add anti-abuse to form submit path:
   - Honeypot field and/or Turnstile/reCAPTCHA token validation via backend.

5. Lock down OneDrive repository API (if used):
   - Return only HTTPS URLs from trusted Microsoft domains (`onedrive.live.com`, `1drv.ms`, `*.sharepoint.com`).
   - Enforce read-only links by policy (no edit scopes/links by default).
   - Restrict CORS to production domain(s) only.
   - Log link issuance/access events for auditability.

6. Prevent silent contact-message loss:
   - Adopt queue-first contact API flow with server-issued `submissionId`.
   - Implement retry policy + dead-letter handling for Graph send failures.
   - Return trace reference IDs to frontend for support follow-up.

## P1 (high-value hardening/usability)

1. Accessibility hardening:
   - Add `aria-label` to icon-only controls.
   - Add `Esc` close handler for menu.
   - Implement focus trap in menu overlay.

2. Teams guardrails:
   - Validate teams widget script domain in docs and deployment checklist.
   - Define fallback behavior if widget fails.

3. Embed hardening:
   - Tighten iframe attributes (`referrerPolicy`, `allow` scope, sandbox if compatible with map UX).

4. OneDrive permission minimization:
   - Prefer Graph `Sites.Selected` with site-level grants over broad tenant-wide scopes.
   - Review and prune admin-consented Graph permissions quarterly.

5. Contact observability and reporting:
   - Add immediate alerts for repeated send failures.
   - Add weekly reliability summary mail (counts + failure codes + unresolved IDs).
   - Keep weekly summary free from unnecessary PII.

## P2 (recommended polish/ops)

1. Technical SEO scaffolding:
   - Add `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`.

2. Reliability UX:
   - Add route-level `loading.tsx` and `error.tsx` for key routes.

3. Dependency hygiene:
   - Patch-update `lucide-react`; evaluate `eslint` major separately.

4. Retention and purge automation:
   - Purge raw contact payload data after short TTL (for example 14 days).
   - Retain metadata-only delivery audit for longer operational window (for example 90 days).

## Deployment guardrails checklist

1. Verify HTTPS force and valid TLS chain on Hostinger.
2. Verify `.env*` is never deployed to public web root.
3. Verify Teams and Graph endpoints are reachable only over HTTPS.
4. Verify CSP does not block required scripts and blocks unknown origins.
5. Verify contact API rejects malformed payloads and high-frequency abuse.
6. Verify repository endpoint never returns non-Microsoft/untrusted URLs.
