# 10XAI Site

Conversion-focused marketing site for 10XAI, built with Next.js and prepared for deployment to a separate 10XAI Vercel account.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and set any values you want active locally:

```bash
NEXT_PUBLIC_BOOKING_URL=https://calendar.app.google/your-booking-page
NEXT_PUBLIC_WHATSAPP_URL=
INTERNAL_PORTAL_PASSWORD=change-me
```

If these are not set, the site falls back safely:

- booking CTA falls back to the internal `/book` setup page
- WhatsApp CTA falls back to email

For live booking, use the public Google Calendar appointment schedule URL you want visitors to book against. The site will route all booking CTAs through `/book`, and that route will redirect to the configured Google Calendar booking page in production.

## Internal operator portal

The site now includes a hidden internal portal:

- `/ops-access` is the password entry page
- `/ops` contains the protected dashboard
- `/ops/sales`, `/ops/marketing`, and `/ops/analytics` contain the internal suites

This area is not linked from the public homepage, is marked `noindex`, and is disallowed in `robots.txt`. Set `INTERNAL_PORTAL_PASSWORD` in your environment to control access.

## Production deployment

1. Push this repo to the dedicated `10xai-site` GitHub repository.
2. Import that repository into the separate 10XAI Vercel account or team.
3. In Vercel project settings, add:
   - `10xai.us`
   - `www.10xai.us`
4. Set any production environment variables in Vercel:
   - `NEXT_PUBLIC_BOOKING_URL`
   - `NEXT_PUBLIC_WHATSAPP_URL`
5. Update GoDaddy DNS with the exact records shown by Vercel for that project.

## Notes

- The site is static-safe and deploys without secrets.
- SEO launch assets are included:
  - `/robots.txt`
  - `/sitemap.xml`
- Brand assets live in `public/brand`.
