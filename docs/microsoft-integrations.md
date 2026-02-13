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

## Security notes

- Never expose tenant secrets in the browser.
- Restrict CORS to your production site origin.
- Add bot/spam protection (honeypot, rate limiting, CAPTCHA if needed).
- Log errors server-side; do not leak Graph responses to clients.
