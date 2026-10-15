# Sister & Co. Party Venue

A responsive six-page website built with a small dependency-free client-side router and Node.js. The supplied venue photographs, standalone logo and package poster references are stored in `public/images/`.

## Run locally

Requires Node.js 20 or newer. There are no third-party runtime dependencies.

```sh
npm run dev
```

The local development URL is `http://127.0.0.1:4173`. Create a production build with `npm run build`; preview it with `npm run preview`.

## Update business content

Edit `src/data/business.ts` to update the business name, logo, phone number, address, Facebook URL, advertised time slots, package text, prices and verification status. Current poster-derived contact information and package references are explicitly awaiting owner confirmation. Prices remain “Enquire for pricing.” Do not publish the advertised inclusions until an owner confirms them. In particular, confirm what distinguishes Platinum from Ultimate.

Page templates are in `app.js`; central business, package and photo data are in `business.js`; site-wide styles and breakpoints are in `styles.css`. Replace or add images in `public/images/` and update photo and package data in `business.js`; use descriptive alt text. Preserve originals. Image optimization can be performed as a deployment step while keeping original masters.

## Real booking enquiries

The booking form currently validates required fields in the browser and then displays a notice that the enquiry has **not** been sent. No details are transmitted or stored. To enable real enquiries, select and configure an owner-approved form endpoint (or a small backend), set its URL/key in environment configuration, submit the form fields with appropriate consent and privacy handling, display success only after a confirmed server response, and verify delivery with the venue. Do not collect real customer details on the current demo form. A WhatsApp link is omitted because no verified WhatsApp contact was supplied.

## Domain and deployment

Deploy the `dist/` output to a static host that supports SPA fallback to `index.html`. Add a canonical URL after the domain is confirmed, and populate `public/sitemap.xml` with absolute URLs on that domain. Configure HTTPS and SPA fallback. Update metadata in `index.html` once the production domain and share image are known.

## Before publication

- Owner-confirm the phone number `071 064 8880`, `80 School Road, Hartzenbergfontein`, and time slots `09:00–12:00` / `14:00–17:00`.
- Owner-confirm current package names, all package inclusions, differences between Platinum and Ultimate, pricing and facility availability.
- Confirm permission to publish every supplied photograph, logo and poster.
- Configure a real booking enquiry service, privacy handling and a verified response destination.
- Confirm the production domain and update canonical metadata and sitemap.

See [RESEARCH.md](RESEARCH.md) for source notes and the asset inventory.
