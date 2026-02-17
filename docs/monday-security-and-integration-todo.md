# Monday Security and Integration TODO

Date captured: 2026-02-17  
Source: Agreed action list from prior session.

## Must-do items

1. Remove unsafe TLS override from all environments:
   - Ensure `NODE_TLS_REJECT_UNAUTHORIZED=0` is unset in local shell, CI, and hosting build/runtime configs.

2. Build contact backend using queue-first delivery:
   - Validate payload server-side.
   - Accept/return `submissionId`.
   - Add retry policy and dead-letter handling for Graph failures.

3. Add anti-abuse protection to contact endpoint:
   - Strict CORS allowlist.
   - Rate limiting.
   - Honeypot and/or CAPTCHA token verification.

4. Finalize Microsoft integration hardening:
   - Graph mail app with least privilege.
   - Exchange application access policy for mailbox restriction.
   - Teams approach decision (embedded widget vs ACL/deep-link fallback).
   - OneDrive repository API URL trust enforcement.

5. Implement observability and data lifecycle:
   - Immediate failure alerts.
   - Weekly reliability summary email.
   - Automated purge jobs (short TTL for payload content, longer TTL for metadata only).

6. Apply Hostinger production hardening:
   - Enforce CSP/HSTS/security headers at hosting layer.
   - Complete accessibility hardening (menu Esc handler, focus trap, icon aria labels).
   - Add SEO scaffolding (`app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`).

7. Run end-to-end go-live validation:
   - Contact submission success/failure paths.
   - Teams chat primary and fallback behavior.
   - OneDrive repository path and URL trust checks.
