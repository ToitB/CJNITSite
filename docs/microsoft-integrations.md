# Microsoft Integrations: Teams Chat + Graph Contact Mail

This project is statically exported (`next export`), so secrets must **not** be stored in frontend code.  
The contact form submits to an external API endpoint that you host securely (Azure Function / App Service / API gateway).

## 1) Teams website chat (`Chat with us` button)

The contact section now supports Microsoft Teams Live Chat widget loading via env vars:

- `NEXT_PUBLIC_TEAMS_LIVE_CHAT_SCRIPT_URL`
- `NEXT_PUBLIC_TEAMS_LIVE_CHAT_APP_ID`
- `NEXT_PUBLIC_TEAMS_LIVE_CHAT_ORG_ID`
- `NEXT_PUBLIC_TEAMS_LIVE_CHAT_ORG_URL`
- Optional fallback: `NEXT_PUBLIC_TEAMS_CHAT_FALLBACK_URL`

When configured, the button tries to open the Live Chat SDK.  
If widget SDK is unavailable, fallback URL opens in a new tab.

### Provisioning steps (Teams admin)

1. Set up Teams Live Chat in Microsoft Teams admin.
2. Generate the website widget snippet/config from Teams.
3. Copy the script URL and data values into your environment variables.

Reference docs:

- <https://learn.microsoft.com/en-us/microsoftteams/live-chat-overview>
- <https://learn.microsoft.com/en-us/microsoftteams/add-live-chat-widget-to-your-website>

## 2) Contact form -> Microsoft Graph `sendMail`

The frontend posts JSON to `NEXT_PUBLIC_CONTACT_API_URL`.

Expected payload:

```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "message": "Help needed...",
  "source": "cjn-website-contact-form",
  "submittedAt": "2026-02-13T12:34:56.000Z"
}
```

Recommended response:

```json
{
  "submissionId": "uuid-or-trace-id",
  "queued": true
}
```

If delivery fails, still return a `submissionId` where possible so support can trace and reprocess.

### Recommended backend architecture

Use an Azure Function (or similar) with:

1. Microsoft Entra app registration
2. Application permission: `Mail.Send` (Graph)
3. Admin consent granted
4. Client credentials flow to acquire Graph token
5. Graph `POST /users/{mailbox}/sendMail`

### Minimal server-side pseudo-flow

```text
Validate input -> get app token -> call Graph sendMail -> return 200/400/500
```

### Graph docs

- <https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0>
- <https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow>

## 3) OneDrive repository in Resources Hub

The `General Repository` card supports two modes:

1. Direct link mode:
   - Set `NEXT_PUBLIC_ONEDRIVE_REPOSITORY_URL` to a read-only share link.
   - Use an HTTPS URL from trusted hosts (`onedrive.live.com`, `1drv.ms`, `*.sharepoint.com`).

2. API-backed mode (recommended):
   - Set `NEXT_PUBLIC_ONEDRIVE_REPOSITORY_API_URL` to your secure backend endpoint.
   - Endpoint returns JSON:

```json
{
  "url": "https://contoso.sharepoint.com/.../Shared%20Documents/..."
}
```

### Why API-backed mode is better

- You can rotate links without redeploying frontend.
- You can keep repository access policy centralized.
- You can enforce tenant/site restrictions server-side.

### Suggested Graph backend behavior

1. Authenticate with app credentials in Entra ID.
2. Resolve target drive/folder via Graph (if needed).
3. Return only view-safe URL to the frontend.
4. Never return write/edit links unless explicitly required.

### Permissions guidance (least privilege)

- Prefer `Sites.Selected` + site-level grants for SharePoint-backed repositories.
- Avoid broad write scopes unless operationally required.
- Audit all grants and admin consents periodically.

### Relevant docs

- <https://learn.microsoft.com/en-us/graph/api/resources/drive?view=graph-rest-1.0>
- <https://learn.microsoft.com/en-us/graph/api/driveitem-createLink?view=graph-rest-1.0>
- <https://learn.microsoft.com/en-us/graph/permissions-reference>

## Security notes

- Never expose tenant secrets in the browser.
- Restrict CORS to your production site origin.
- Add bot/spam protection (honeypot, rate limiting, CAPTCHA if needed).
- Log errors server-side; do not leak Graph responses to clients.
- For repository links, return and store read-only URLs whenever possible.
