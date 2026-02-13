# OneDrive, Teams Chat, and Graph API Go-Live Setup Guide

Date: 2026-02-13  
Scope: CJN IT Solutions static Next.js site (`next export`) + secure Microsoft-backed APIs.

This guide is the production setup runbook for:

1. Contact form -> Microsoft Graph mail delivery
2. Website chat -> Teams (two options: widget or ACL-controlled handoff)
3. Resources Hub `General Repository` -> OneDrive/SharePoint link resolution

## 1) Architecture you should keep

Because the site is statically exported, keep this split:

1. Frontend (Hostinger static): only public config in `NEXT_PUBLIC_*`
2. Backend API (Azure Function/App Service): secrets + Graph tokens + access control

Do not place Graph secrets, tenant secrets, or mailbox credentials in frontend code.

## 2) Environment variables used by this site

Frontend/public vars (safe to expose):

1. `NEXT_PUBLIC_CONTACT_API_URL`
2. `NEXT_PUBLIC_TEAMS_LIVE_CHAT_SCRIPT_URL`
3. `NEXT_PUBLIC_TEAMS_LIVE_CHAT_APP_ID`
4. `NEXT_PUBLIC_TEAMS_LIVE_CHAT_ORG_ID`
5. `NEXT_PUBLIC_TEAMS_LIVE_CHAT_ORG_URL`
6. `NEXT_PUBLIC_TEAMS_CHAT_FALLBACK_URL`
7. `NEXT_PUBLIC_ONEDRIVE_REPOSITORY_URL`
8. `NEXT_PUBLIC_ONEDRIVE_REPOSITORY_API_URL`

Backend/secret vars (never expose to browser):

1. `AZURE_TENANT_ID`
2. `AZURE_CLIENT_ID`
3. `AZURE_CLIENT_SECRET` (or certificate auth)
4. `GRAPH_MAILBOX_USER` (example: `helpdesk@cjn.co.za`)
5. `ALLOWED_ORIGINS` (exact production origins only)
6. `RATE_LIMIT_WINDOW_MS`
7. `RATE_LIMIT_MAX_REQUESTS`

## 3) Microsoft Entra app registrations (recommended layout)

Use separate apps for least privilege:

1. `cjn-web-contact-mailer` (Graph mail only)
2. `cjn-web-repository-resolver` (Graph/Sites for OneDrive/SharePoint link resolution)

You can use one app for both, but separate apps make auditing and incident response easier.

### 3.1 Create app registrations

In Azure portal:

1. Go to `Microsoft Entra ID -> App registrations -> New registration`.
2. Name the app.
3. Single tenant is recommended for internal service-to-service API.
4. Create app.
5. Create client secret (or upload cert) in `Certificates & secrets`.

### 3.2 Assign Graph permissions

For contact mailer app:

1. `Microsoft Graph -> Application permissions -> Mail.Send`
2. Grant admin consent

For repository resolver app (preferred minimum):

1. `Microsoft Graph -> Application permissions -> Sites.Selected`
2. Grant admin consent
3. Grant app access only to the specific SharePoint site/library used for Resources Hub

If `Sites.Selected` cannot be implemented immediately, temporary fallback is broader read scope, then tighten later.

### 3.3 Restrict mailbox access with Exchange application access policy (important)

Even with `Mail.Send`, restrict which mailboxes the app can use.

High-level steps:

1. Create a mail-enabled security group (for allowed target mailboxes).
2. Add only intended mailbox(es), for example `helpdesk@cjn.co.za`.
3. Create Exchange application access policy for the app ID.
4. Test the policy before go-live.

This prevents broad tenant-wide send capability.

## 4) Contact form setup (Graph mail pipeline)

Current frontend behavior (`components/Contact.tsx`):

1. POSTs JSON to `NEXT_PUBLIC_CONTACT_API_URL`
2. Payload includes `name`, `email`, `message`, `source`, `submittedAt`

### 4.1 Backend endpoint contract

Endpoint: `POST /api/contact`

Request body:

```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "message": "Need help with infrastructure",
  "source": "cjn-website-contact-form",
  "submittedAt": "2026-02-13T12:34:56.000Z"
}
```

Required backend controls:

1. Validate all fields server-side (Zod or equivalent)
2. Enforce max lengths and email format
3. Drop HTML/script payloads or escape safely
4. Rate limit by IP + fingerprint
5. Honeypot/CAPTCHA verification
6. CORS allowlist only your production domains
7. Structured logs with request ID (no secret leakage)

### 4.2 Graph sendMail flow

Backend flow:

1. Acquire token using client credentials flow
2. Call Graph: `POST /users/{GRAPH_MAILBOX_USER}/sendMail`
3. Return `200` only on success
4. Return generic error to client, detailed error only in server logs

2FA note: app-to-app Graph auth does not bypass user security in a bad way; it uses app identity. Keep it locked with app access policy and least privilege.

## 5) Teams chat integration: two supported options

## Option A (Recommended UX): Embedded widget

This is the chat-box-in-site experience.

What the visitor sees:

1. Clicks `Chat with us`
2. Chat panel opens in the site
3. They can type immediately in the web chat panel

Current frontend integration (`components/Contact.tsx`, `components/Hero.tsx`) expects:

1. `NEXT_PUBLIC_TEAMS_LIVE_CHAT_SCRIPT_URL`
2. `NEXT_PUBLIC_TEAMS_LIVE_CHAT_APP_ID`
3. `NEXT_PUBLIC_TEAMS_LIVE_CHAT_ORG_ID`
4. `NEXT_PUBLIC_TEAMS_LIVE_CHAT_ORG_URL`

Setup steps:

1. Provision Microsoft chat widget service in your tenant (Omnichannel/Teams-supported live chat stack).
2. Create chat channel and deployment config.
3. Copy script URL + app/org values.
4. Put values into frontend environment.
5. Verify CSP allows only the exact widget script origin.
6. Keep `NEXT_PUBLIC_TEAMS_CHAT_FALLBACK_URL` configured as failover.

Licensing note:

1. Pure Teams licensing alone may not always provide the same website widget feature set.
2. Confirm your tenant has the specific website live-chat capability before go-live.

## Option B: ACL-controlled Teams handoff (no embedded widget)

This is a controlled redirect/open-in-Teams model.

What the visitor sees:

1. Clicks `Chat with us`
2. Browser opens Teams web/app deep link
3. User continues chat in Teams context (not an embedded website box)

How to configure:

1. Set `NEXT_PUBLIC_TEAMS_CHAT_FALLBACK_URL` to a Teams deep link (chat/user/channel link).
2. In Teams admin center, configure external access/guest access policy.
3. Allow only approved domains/users (your ACL policy).
4. Provide a fallback path (contact form/email) for blocked users.

Good fit:

1. You want strict access policy and already work primarily inside Teams
2. You can accept redirecting users out of the site

## 6) OneDrive/SharePoint repository setup (Resources Hub)

Current frontend behavior (`components/ResourcesPageContent.tsx`):

1. Uses direct URL from `NEXT_PUBLIC_ONEDRIVE_REPOSITORY_URL`, or
2. Resolves URL from `NEXT_PUBLIC_ONEDRIVE_REPOSITORY_API_URL` (`GET`, expects `{ "url": "..." }`)
3. Frontend already rejects untrusted/non-HTTPS hosts

## Option A: Direct link (quickest)

1. Create a read-only share link to target folder/library.
2. Set `NEXT_PUBLIC_ONEDRIVE_REPOSITORY_URL`.
3. Keep link restricted to view-only.

## Option B (Recommended): API-backed resolver

1. Build backend endpoint `GET /api/repository-link`.
2. Backend resolves current approved URL (from Graph or secure config store).
3. Backend returns:

```json
{
  "url": "https://contoso.sharepoint.com/.../Shared%20Documents/..."
}
```

4. Frontend loads this endpoint via `NEXT_PUBLIC_ONEDRIVE_REPOSITORY_API_URL`.

Backend rules:

1. Return HTTPS only
2. Return only `1drv.ms`, `onedrive.live.com`, or `*.sharepoint.com`
3. Return read-only links only
4. Apply strict CORS + caching policy
5. Log issuance events for audit

## 7) Hostinger deployment steps

1. Build/deploy static site to Hostinger.
2. Set frontend `NEXT_PUBLIC_*` values in Hostinger build environment.
3. Deploy backend APIs on Azure (or equivalent secure host).
4. Add production domains to backend `ALLOWED_ORIGINS`.
5. Ensure HTTPS-only for site and APIs.
6. Validate chat button, contact submit, and repository open flow.

## 8) Security hardening checklist tied to these integrations

Before production launch, verify:

1. `NODE_TLS_REJECT_UNAUTHORIZED` is not set to `0` anywhere.
2. CSP includes only required Microsoft/Google origins (no broad wildcards).
3. Contact API has validation + rate limiting + anti-bot checks.
4. Graph permissions are least privilege and admin-consented intentionally.
5. Mail app has mailbox restriction policy applied and tested.
6. OneDrive resolver returns only trusted read-only URLs.
7. Teams fallback link behavior is tested for allowed and blocked users.
8. All secrets are server-side only (never in `NEXT_PUBLIC_*`).

## 9) Delivery observability and purge policy

For contact submissions, do not rely only on mailbox delivery visibility.

1. Use queue-first processing in backend.
2. Return and log `submissionId` for every request.
3. Trigger immediate alerting on repeated Graph/API failures.
4. Send weekly reliability summary to operations mailbox.
5. Purge detailed message payloads after short retention window.
6. Keep metadata-only audit logs for trend/incident analysis.

Detailed runbook:

1. `docs/contact-delivery-reliability-guide.md`

## 10) Go-live validation script (manual)

1. Contact form success path:
   - Submit valid form, confirm mailbox receives message.
2. Contact form abuse path:
   - Submit invalid payload/rate spike, confirm rejection and logs.
3. Teams path:
   - Widget mode opens embedded chat, or ACL mode opens Teams link correctly.
4. Repository path:
   - `General Repository` opens the expected OneDrive/SharePoint view link.
5. Failure fallback:
   - Temporarily disable widget/repository API and confirm graceful fallback messages.

## 11) Rollback plan

If any integration fails at launch:

1. Keep site live with contact email fallback.
2. Disable broken public env var (widget/API URL).
3. Redeploy frontend with stable fallback values.
4. Fix backend config/permissions, then re-enable integration.
