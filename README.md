# PosSize — Free Trading Calculators

> A collection of free, no-signup trading tools built for serious traders.

🔗 **Live Site**: [possize.com](https://www.possize.com)

---

## Overview

PosSize is a fully client-side trading toolkit designed to help traders make faster, more accurate decisions. Built with Next.js 16 and deployed on Cloudflare Pages, the site focuses on performance, SEO, and a clean developer experience.

The project was built as both a functional product and a portfolio piece — designed from scratch including UI/UX, SEO strategy, and deployment pipeline.

---

## Features

- **Position Size Calculator** — Calculate optimal share count based on account size and risk tolerance
- **Risk/Reward Calculator** — Evaluate trade quality with R/R ratio and minimum win rate
- **Compound Interest Calculator** — Visualize account growth over time with monthly return simulation
- **Profit/Loss Calculator** — Calculate exact P&L including commissions for long and short trades
- **Pip Calculator** — Calculate the monetary value of a pip for any forex pair, lot size and account currency
- **Margin Calculator** — Calculate required margin and notional value for any leveraged position

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Deployment | Cloudflare Pages |
| SEO | Next.js Metadata API, sitemap.xml, robots.txt |

---

## Architecture

```
src/
└── app/
    ├── layout.tsx                        # Root layout, fonts, global metadata
    ├── page.tsx                          # Homepage — tool listing
    ├── globals.css                       # Global styles + CSS variables
    ├── sitemap.ts                        # Auto-generated sitemap
    ├── robots.ts                         # Robots.txt
    ├── position-size-calculator/
    │   ├── page.tsx                      # SEO metadata (server component)
    │   └── Calculator.tsx               # Interactive calculator (client component)
    ├── risk-reward-calculator/
    │   ├── page.tsx
    │   └── Calculator.tsx
    ├── compound-interest-calculator/
    │   ├── page.tsx
    │   └── Calculator.tsx
    └── profit-loss-calculator/
        ├── page.tsx
        └── Calculator.tsx
```

### Key Design Decisions

**Server/Client Component Split**
Each tool page separates SEO metadata (server component) from interactive logic (client component). This allows `next/metadata` to work correctly while keeping calculator logic reactive with `useState`.

**CSS Variables over Tailwind Theme**
A custom dark theme is implemented via CSS variables (`--bg`, `--accent`, `--surface`, etc.) for consistency across all components without relying on Tailwind config.

**Cloudflare Pages Deployment**
Static export via Next.js App Router deployed to Cloudflare Pages for global CDN distribution and zero cold start times.

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/possize.git
cd possize

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## SEO Strategy

- Unique `title` and `description` metadata per page targeting high-volume keywords
- `metadataBase` + per-page **canonical** URLs
- **Structured data (JSON-LD)** on every page: `WebApplication`, `FAQPage`,
  `BreadcrumbList`, plus `WebSite` / `Organization` / `ItemList` on the homepage
  — targets Google rich results (FAQ accordions, sitelinks)
- **Long-form content** on each calculator (how-to, formula, worked example,
  FAQ) so the tool pages have real ranking surface instead of being thin
- **Internal linking** between related calculators
- Auto-generated `sitemap.xml` + branded OpenGraph image (`next/og`)
- `robots.txt` configured for full crawl access

---

## Monetization & Analytics

- **Google AdSense** — publisher script + `ads.txt` are wired in. Ad placements
  exist on the homepage and every calculator via `src/app/AdUnit.tsx`.
- **Cloudflare Web Analytics** — beacon injected in the root layout.

> ⚠️ **To turn on ads:** open `src/app/AdUnit.tsx` and replace `AD_SLOT`
> (`"0000000000"`) with a real **Display ad unit** slot id from your AdSense
> dashboard (Ads → By ad unit → Display → copy `data-ad-slot`). Until then,
> `AdUnit` renders nothing, so no empty ad boxes ship. Alternatively, enable
> **Auto ads** in AdSense — that works with the existing layout script and
> needs no slot id.

---

## Roadmap

Shipped:

- [x] Google AdSense integration (set the ad slot to go live — see above)
- [x] Pip Calculator
- [x] Margin Calculator
- [x] Dark/Light mode toggle
- [x] PWA support for mobile offline use
- [x] Structured data + on-page content for SEO

Next ideas for traffic & revenue:

- [ ] More tools (Kelly Criterion, R-multiple tracker, breakeven calculator)
- [ ] Shareable result URLs (query-param deep links) to earn backlinks
- [ ] Blog / guides targeting long-tail keywords

---

## License

MIT
