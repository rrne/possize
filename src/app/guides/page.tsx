import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../Nav";
import { JsonLd } from "../seo/JsonLd";
import { GUIDES, GUIDE_ORDER } from "./content";

const BASE = "https://possize.com";

export const metadata: Metadata = {
  alternates: { canonical: "/guides" },
  title: "Trading Guides — Position Sizing, Risk & Forex | PosSize",
  description:
    "Plain-English trading guides on position sizing, risk/reward, and forex lot sizes — paired with free calculators to put each lesson into practice.",
  openGraph: {
    title: "Trading Guides — PosSize",
    description:
      "Plain-English guides on position sizing, risk/reward, and forex lot sizes.",
    url: "https://possize.com/guides",
    siteName: "PosSize",
    type: "website",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Trading Guides",
    url: `${BASE}/guides`,
    description:
      "Plain-English trading guides on position sizing, risk/reward, and forex lot sizes.",
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: GUIDE_ORDER.map((slug, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/guides/${slug}`,
      name: GUIDES[slug].title,
    })),
  },
];

export default function Page() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Nav />

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-10">
        <div
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border px-3 py-1.5 rounded-sm mb-6"
          style={{ color: "var(--accent)", borderColor: "rgba(0,212,170,0.25)" }}
        >
          Guides
        </div>
        <h1 className="font-mono font-bold mb-4" style={{ fontSize: "clamp(28px, 5vw, 44px)", letterSpacing: "-0.02em", color: "var(--text)" }}>
          Trading <span style={{ color: "var(--accent)" }}>Guides</span>
        </h1>
        <p className="text-lg font-light leading-relaxed" style={{ color: "var(--muted)" }}>
          Plain-English explanations of the concepts behind the calculators — so you understand the numbers, not just read them.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="space-y-4">
          {GUIDE_ORDER.map((slug) => {
            const g = GUIDES[slug];
            return (
              <Link
                key={slug}
                href={`/guides/${slug}`}
                className="group block p-7 rounded-sm border transition-all duration-200"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-3 font-mono text-xs mb-3" style={{ color: "var(--muted)" }}>
                  <span style={{ color: "var(--accent)" }}>{g.category}</span>
                  <span>·</span>
                  <span>{g.readTime}</span>
                </div>
                <h2 className="font-mono font-bold text-lg mb-2 transition-colors group-hover:text-[var(--accent)]" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>
                  {g.title}
                </h2>
                <p className="text-sm font-light leading-relaxed" style={{ color: "var(--muted)" }}>
                  {g.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <JsonLd data={structuredData} />
    </main>
  );
}
