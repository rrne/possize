import Link from "next/link";
import Nav from "../Nav";
import AdUnit from "../AdUnit";
import { JsonLd } from "../seo/JsonLd";
import { TOOLS } from "../seo/tools";
import { GUIDES, GUIDE_ORDER, type Guide } from "./content";

const BASE = "https://www.possize.com";

function structuredData(g: Guide) {
  const url = `${BASE}/guides/${g.slug}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    url,
    datePublished: "2026-06-26",
    dateModified: "2026-06-26",
    author: { "@type": "Organization", name: "PosSize" },
    publisher: {
      "@type": "Organization",
      name: "PosSize",
      logo: { "@type": "ImageObject", url: `${BASE}/icon-512.png` },
    },
    mainEntityOfPage: url,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE}/guides` },
      { "@type": "ListItem", position: 3, name: g.title, item: url },
    ],
  };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: g.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return [article, breadcrumb, faqPage];
}

function Cta({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-sm border font-mono text-xs uppercase tracking-wider px-4 py-3 my-2 transition-colors"
      style={{ background: "rgba(0,212,170,0.08)", borderColor: "rgba(0,212,170,0.3)", color: "var(--accent)" }}
    >
      {label}
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </Link>
  );
}

export default function GuideArticle({ slug }: { slug: string }) {
  const g = GUIDES[slug];
  if (!g) return null;

  const relatedGuides = GUIDE_ORDER.filter((s) => s !== slug).map((s) => GUIDES[s]);

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Nav />

      <article className="max-w-3xl mx-auto px-6 py-14">
        {/* Breadcrumb */}
        <nav className="font-mono text-xs mb-8 flex items-center gap-2 flex-wrap" style={{ color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--muted)" }}>Home</Link>
          <span>/</span>
          <Link href="/guides" style={{ color: "var(--muted)" }}>Guides</Link>
          <span>/</span>
          <span style={{ color: "var(--accent)" }}>{g.category}</span>
        </nav>

        {/* Title */}
        <h1 className="font-mono font-bold mb-4" style={{ fontSize: "clamp(26px, 5vw, 40px)", letterSpacing: "-0.02em", color: "var(--text)" }}>
          {g.title}
        </h1>
        <div className="flex items-center gap-3 font-mono text-xs mb-10" style={{ color: "var(--muted)" }}>
          <span>{g.category}</span>
          <span>·</span>
          <span>{g.readTime}</span>
          <span>·</span>
          <span>Updated {g.updated}</span>
        </div>

        {/* Intro */}
        <div className="font-light leading-relaxed space-y-4 text-lg" style={{ color: "var(--muted)" }}>
          {g.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Sections */}
        {g.sections.map((s, i) => (
          <section key={i} className="mt-10">
            <h2 className="font-mono font-bold text-xl mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>
              {s.h}
            </h2>
            <div className="font-light leading-relaxed space-y-4" style={{ color: "var(--muted)" }}>
              {s.body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
            {s.cta && (
              <div className="mt-4">
                <Cta label={s.cta.label} href={s.cta.href} />
              </div>
            )}
          </section>
        ))}

        {/* In-content ad */}
        <div className="my-10">
          <AdUnit />
        </div>

        {/* Key takeaways */}
        <section
          className="mt-10 rounded-sm border p-6"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <h2 className="font-mono font-bold text-lg mb-4" style={{ color: "var(--text)" }}>
            Key takeaways
          </h2>
          <ul className="space-y-2">
            {g.takeaways.map((t, i) => (
              <li key={i} className="flex gap-3 font-light" style={{ color: "var(--muted)" }}>
                <span className="shrink-0" style={{ color: "var(--accent)" }}>→</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <h2 className="font-mono font-bold text-xl mt-12 mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {g.faqs.map((f, i) => (
            <details key={i} className="rounded-sm border p-5 group" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center gap-4" style={{ color: "var(--text)" }}>
                {f.q}
                <span className="font-mono text-lg shrink-0 transition-transform group-open:rotate-45" style={{ color: "var(--accent)" }}>+</span>
              </summary>
              <p className="mt-3 text-sm font-light" style={{ color: "var(--muted)" }}>{f.a}</p>
            </details>
          ))}
        </div>

        {/* Related calculators */}
        <h2 className="font-mono font-bold text-xl mt-12 mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>
          Calculators in this guide
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {g.related.map((rs) => {
            const t = TOOLS[rs];
            if (!t) return null;
            return (
              <Link
                key={rs}
                href={`/${rs}`}
                className="rounded-sm border p-4 transition-colors flex items-center justify-between gap-3"
                style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
              >
                <span className="font-mono text-sm">{t.name}</span>
                <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{t.category}</span>
              </Link>
            );
          })}
        </div>

        {/* Related guides */}
        <h2 className="font-mono font-bold text-xl mt-12 mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>
          More guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {relatedGuides.map((rg) => (
            <Link
              key={rg.slug}
              href={`/guides/${rg.slug}`}
              className="rounded-sm border p-4 transition-colors flex flex-col gap-1"
              style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
            >
              <span className="font-mono text-sm">{rg.title}</span>
              <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{rg.readTime}</span>
            </Link>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs mt-12" style={{ color: "var(--muted)" }}>
          For educational purposes only. Not financial advice.
        </p>
      </article>

      <JsonLd data={structuredData(g)} />
    </main>
  );
}
