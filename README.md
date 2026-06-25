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
- Auto-generated `sitemap.xml` via Next.js App Router
- `robots.txt` configured for full crawl access
- Submitted to Google Search Console for indexing

---

## Roadmap

- [ ] Google AdSense monetization
- [x] Pip Calculator
- [ ] Additional tools (Margin Calculator)
- [ ] Dark/Light mode toggle
- [ ] PWA support for mobile offline use

---

## License

MIT
