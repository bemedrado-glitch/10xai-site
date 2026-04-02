# 10XAI Rebuild Strategy

## What was weak in the original site

- The previous site felt like a broad AI agency template: many services, little strategic focus.
- The core promise was generic "10X with AI" language instead of a concrete operational result.
- Proof relied on broad claims instead of a sharper value narrative and buyer-specific entry points.
- The CTA path was not opinionated enough around one dominant lead outcome.

## What the new site is trying to do

- Position 10XAI as the implementation partner for SMB owners and operators.
- Make the offer feel operational and commercially grounded, not experimental.
- Replace service sprawl with clear engagement tracks and ROI framing.
- Add an ROI estimator so the conversation starts with economics instead of hype.
- Keep bilingual capability because 10XAI sits between Brazil and the US.

## Competitor read

- Tribe AI and HatchWorks AI are strong outcome-driven references, but their messaging skews enterprise.
- n8n, Zapier, and Relevance AI are alternatives buyers may consider, but they are platforms, not rollout partners.
- That creates a wedge for 10XAI: implementation plus adoption for smaller, faster-moving companies.

## Recommended positioning

Primary positioning:

> Operational AI implementation for ambitious SMBs.

Supporting claims:

- We design, build, launch, and train.
- We focus on workflows tied to revenue, service, and operations.
- We package the work so buyers understand the first step and the payback logic.

## Recommended stack

- GitHub for source control and future CI/CD
- Vercel Hobby for free hosting, previews, custom domain support, and simple deployment
- Supabase Free for lead storage, lightweight backend workflows, and future dashboards
- Google Calendar appointment schedule for booking
- Gmail or a transactional email provider for notifications after form submission

## Production note

This first build is deployment-safe without secrets. For full lead capture, wire:

- `NEXT_PUBLIC_BOOKING_URL`
- `NEXT_PUBLIC_WHATSAPP_URL`
- Supabase URL/key and a lead submission endpoint

Then the email-draft fallback can become a fully tracked database-backed form.
