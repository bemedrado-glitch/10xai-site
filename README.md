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
NEXT_PUBLIC_BOOKING_URL=
NEXT_PUBLIC_WHATSAPP_URL=
```

If these are not set, the site falls back safely:

- booking CTA falls back to the on-page contact section
- WhatsApp CTA falls back to email

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
