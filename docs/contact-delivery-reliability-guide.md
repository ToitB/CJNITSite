# Contact Delivery Reliability Guide

Date: 2026-02-13  
Scope: Website contact form delivery assurance, observability, retention, and purge policy.

## 1) Short answer to your question

Yes, you can send a weekly reliability log to the same mailbox and purge records after that.  
Recommended approach is:

1. Send immediate failure alerts for urgent visibility.
2. Send a weekly summary report for management/audit.
3. Purge detailed failed payloads after a short retention window.

Weekly reporting alone is not enough because urgent failures could remain unnoticed for days.

## 2) Target architecture (production-safe)

1. Frontend form submits to contact API.
2. API validates request and stamps/returns `submissionId`.
3. API writes request to a queue first.
4. Worker sends mail via Microsoft Graph.
5. Worker records final state (`delivered`, `retrying`, `failed`).
6. Alerting pipeline notifies team on sustained failures.
7. Scheduled job sends weekly summary and runs purge.

This avoids silent drops and gives delivery proof.

## 3) Data model (minimal)

Store only what is needed for support and audit.

Suggested fields:

1. `submissionId` (string, unique)
2. `createdAt` (UTC datetime)
3. `status` (`received|queued|delivered|failed`)
4. `failureCode` (optional; Graph/API code)
5. `retryCount` (integer)
6. `lastAttemptAt` (UTC datetime)
7. `origin` (`cjn-website-contact-form`)

PII minimization:

1. Keep full message/body only as long as necessary for delivery attempts.
2. Keep metadata longer than message content.

## 4) Retention and purge policy (recommended)

1. Raw message content:
   - Keep up to `14 days` for retry/forensics.
   - Purge automatically once delivered + retention elapsed.
2. Delivery metadata (no message body):
   - Keep `90 days` for trend and incident review.
3. Weekly digest:
   - Keep mail reports in mailbox per company policy.

If POPIA/legal policy requires shorter retention, follow the stricter policy.

## 5) Weekly summary email format

Recipient: `helpdesk@cjn.co.za` (and optional operations distribution list)

Include:

1. Period covered (`YYYY-MM-DD` to `YYYY-MM-DD`)
2. Total submissions
3. Delivered count
4. Failed count
5. Top failure reasons (Graph 429, timeout, auth, etc.)
6. Unresolved `submissionId` list only (avoid full PII in report)
7. Purge job results (records purged + any errors)

## 6) Immediate alert thresholds

Trigger alert to Teams/email when:

1. `>= 3` consecutive delivery failures, or
2. failure rate exceeds `10%` over `15 minutes`, or
3. Graph auth failure is detected.

This catches outages long before the weekly report.

## 7) Frontend traceability already wired

Contact form now sends and surfaces a reference ID:

1. `submissionId` included in payload
2. `X-Submission-Id` header included
3. UI displays `Reference ID` on success/failure
4. Request timeout is enforced for clearer user feedback

Relevant file:

1. `components/Contact.tsx`

## 8) Backend API contract for this frontend

On success:

```json
{
  "submissionId": "uuid-or-trace-id",
  "queued": true
}
```

On failure:

```json
{
  "submissionId": "uuid-or-trace-id",
  "message": "Delivery temporarily unavailable"
}
```

Even on failure, return `submissionId` whenever possible for support tracing.

## 9) Other practical considerations you should include

1. Incident runbook:
   - Define who responds when alerts fire and expected SLA.
2. Access control:
   - Restrict log/report access to least privilege roles.
3. Secret hygiene:
   - Rotate Graph app secrets/certs regularly.
4. Evidence trail:
   - Keep immutable audit entries for auth changes and admin consent updates.
5. Data subject requests:
   - Document how to locate and delete records by `submissionId`/email when required.
6. Abuse controls:
   - CAPTCHA or Turnstile + IP rate limiting + WAF rule set.
7. Synthetic monitoring:
   - Scheduled test submission path in non-production mailbox.
8. Disaster readiness:
   - If Graph is unavailable, queue and retry rather than dropping requests.

## 10) Implementation order

1. Backend queue-first endpoint with validation + `submissionId`.
2. Worker for Graph send + retry + dead-letter handling.
3. Alerting rules (immediate).
4. Weekly digest scheduler.
5. Purge scheduler.
6. Final compliance sign-off against POPIA policy.
