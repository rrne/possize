import Link from "next/link";
import { JsonLd } from "./JsonLd";
import BrokerCTA from "../BrokerCTA";
import AdUnit from "../AdUnit";
import { TOOLS, TOOL_ORDER, type ToolContent } from "./tools";

const BASE = "https://www.possize.com";

function structuredData(t: ToolContent) {
  const url = `${BASE}/${t.slug}`;
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t.name,
    url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: t.intro[0],
  };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: t.name, item: url },
    ],
  };
  return [webApp, faqPage, breadcrumb];
}

export default function ToolPage({ slug }: { slug: string }) {
  const t = TOOLS[slug];
  if (!t) return null;

  const related = TOOL_ORDER.filter((s) => s !== slug).map((s) => TOOLS[s]);

  return (
    <section style={{ background: "var(--bg)" }}>
      <article
        className="max-w-3xl mx-auto px-6 pb-20 font-light leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        {/* Intro */}
        <h2 className="font-mono font-bold text-xl mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>
          {`What is the ${t.name}?`}
        </h2>
        {t.intro.map((p, i) => (
          <p key={i} className="mb-4">{p}</p>
        ))}

        {/* Broker affiliate slot — high-intent placement right after the intro */}
        <BrokerCTA context="trade" />

        {/* How to use */}
        <h2 className="font-mono font-bold text-xl mt-10 mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>
          How to use it
        </h2>
        <ol className="space-y-2">
          {t.steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-mono text-sm shrink-0" style={{ color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>

        {/* Formula */}
        <h2 className="font-mono font-bold text-xl mt-10 mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>
          The formula
        </h2>
        <div
          className="rounded-sm border px-5 py-4 font-mono text-sm"
          style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--accent)" }}
        >
          {t.formula.expr}
        </div>
        {t.formula.note && <p className="mt-3 text-sm">{t.formula.note}</p>}

        {/* Example */}
        <h2 className="font-mono font-bold text-xl mt-10 mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>
          Worked example
        </h2>
        <div className="rounded-sm border p-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          {t.example.map((p, i) => (
            <p key={i} className={i < t.example.length - 1 ? "mb-3" : ""}>{p}</p>
          ))}
        </div>

        {/* In-content ad — placed after the worked example where engagement is high */}
        <div className="my-10">
          <AdUnit />
        </div>

        {/* FAQ */}
        <h2 className="font-mono font-bold text-xl mt-10 mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {t.faqs.map((f, i) => (
            <details key={i} className="rounded-sm border p-5 group" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center gap-4" style={{ color: "var(--text)" }}>
                {f.q}
                <span className="font-mono text-lg shrink-0 transition-transform group-open:rotate-45" style={{ color: "var(--accent)" }}>+</span>
              </summary>
              <p className="mt-3 text-sm">{f.a}</p>
            </details>
          ))}
        </div>

        {/* Related tools — internal linking */}
        <h2 className="font-mono font-bold text-xl mt-10 mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>
          Related calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/${r.slug}`}
              className="rounded-sm border p-4 transition-colors flex items-center justify-between gap-3"
              style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
            >
              <span className="font-mono text-sm">{r.name}</span>
              <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{r.category}</span>
            </Link>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs mt-12" style={{ color: "var(--muted)" }}>
          For educational purposes only. Not financial advice.
        </p>
      </article>

      <JsonLd data={structuredData(t)} />
    </section>
  );
}
