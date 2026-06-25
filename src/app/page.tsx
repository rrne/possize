import Link from "next/link";
import Nav from "./Nav";
import AdUnit from "./AdUnit";
import BrokerCTA from "./BrokerCTA";
import { JsonLd } from "./seo/JsonLd";
import { TOOLS, TOOL_ORDER } from "./seo/tools";

const BASE = "https://possize.com";

const homeFaqs = [
  {
    q: "Are these trading calculators really free?",
    a: "Yes. Every PosSize calculator is completely free, requires no signup or account, and runs entirely in your browser. There are no paywalls or usage limits.",
  },
  {
    q: "Which calculator should I use first?",
    a: "Start with the Position Size Calculator — it determines how many shares or contracts to trade for a fixed risk, which is the foundation of risk management. Then use the Risk/Reward and Profit/Loss tools to plan and review each trade.",
  },
  {
    q: "Do the calculators work for forex, stocks, and crypto?",
    a: "Yes. The position size, risk/reward, profit/loss and compound tools work for any market. The Pip and Margin calculators are tailored to leveraged forex trading.",
  },
  {
    q: "Is my data sent anywhere?",
    a: "No. All calculations happen locally in your browser. PosSize does not collect or store the figures you enter.",
  },
];

const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PosSize",
    url: BASE,
    description:
      "Free, no-signup trading calculators: position size, risk/reward, compound interest, profit/loss, pip and margin.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PosSize",
    url: BASE,
    logo: `${BASE}/icon-512.png`,
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: TOOL_ORDER.map((slug, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/${slug}`,
      name: TOOLS[slug].name,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

const tools = [
  {
    href: "/position-size-calculator",
    title: "Position Size Calculator",
    description:
      "Calculate the optimal number of shares or contracts based on your account size and risk tolerance.",
    tags: ["Risk Management", "Essential"],
    color: "#00d4aa",
    icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
    accent: true,
  },
  {
    href: "/risk-reward-calculator",
    title: "Risk/Reward Calculator",
    description:
      "Evaluate trade quality by calculating risk/reward ratio and expected value before entering a position.",
    tags: ["Trade Planning"],
    color: "#38bdf8",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    accent: false,
  },
  {
    href: "/compound-interest-calculator",
    title: "Compound Interest Calculator",
    description:
      "Visualize how your trading account grows over time with consistent returns and compounding.",
    tags: ["Growth", "Long-term"],
    color: "#84cc16",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    accent: false,
  },
  {
    href: "/profit-loss-calculator",
    title: "Profit / Loss Calculator",
    description:
      "Quickly calculate profit or loss on any trade including commissions and fees.",
    tags: ["Trade Review"],
    color: "#fb923c",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    accent: false,
  },
  {
    href: "/pip-calculator",
    title: "Pip Calculator",
    description:
      "Calculate the monetary value of a single pip for any forex pair and lot size in your account currency.",
    tags: ["Forex"],
    color: "#a78bfa",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    accent: false,
  },
  {
    href: "/margin-calculator",
    title: "Margin Calculator",
    description:
      "Calculate the required margin and notional value for any leveraged position before you open it.",
    tags: ["Leverage", "Forex"],
    color: "#fbbf24",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    accent: false,
  },
  {
    href: "/lot-size-calculator",
    title: "Lot Size Calculator",
    description:
      "Find the exact number of lots to trade for a fixed risk, based on your stop-loss in pips.",
    tags: ["Forex", "Risk Management"],
    color: "#22d3ee",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    accent: false,
  },
  {
    href: "/breakeven-calculator",
    title: "Break-Even Calculator",
    description:
      "Find the price your trade must reach to cover all commissions and fees before making a profit.",
    tags: ["Trade Review"],
    color: "#f472b6",
    icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2z",
    accent: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <Nav wide />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border px-3 py-1.5 rounded-sm mb-8"
          style={{
            color: "var(--accent)",
            borderColor: "rgba(0,212,170,0.45)", background: "rgba(0,212,170,0.12)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--accent)" }}
          />
          Free · No Signup · No Paywalls
        </div>

        <h1
          className="font-mono font-bold leading-tight mb-6"
          style={{
            fontSize: "clamp(32px, 6vw, 56px)",
            letterSpacing: "-0.02em",
          }}
        >
          Tools Built for
          <br />
          <span style={{ color: "var(--accent)" }}>Serious Traders</span>
        </h1>

        <p
          className="text-lg font-light leading-relaxed max-w-xl"
          style={{ color: "var(--muted)" }}
        >
          Every calculation you need before, during, and after a trade.
          Fast, accurate, and always free.
        </p>

        {/* Trust / stats strip */}
        <div className="flex flex-wrap gap-x-10 gap-y-5 mt-12">
          {[
            { n: "8", label: "Free calculators" },
            { n: "0", label: "Signups required" },
            { n: "100%", label: "Runs in your browser" },
            { n: "∞", label: "Uses, no limits" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col">
              <span
                className="font-mono font-bold leading-none"
                style={{ fontSize: "clamp(24px, 4vw, 32px)", color: "var(--accent)" }}
              >
                {s.n}
              </span>
              <span className="text-xs mt-2 uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="tool-card group block p-7 rounded-sm border transition-all duration-200"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                ["--c"]: tool.color,
              } as React.CSSProperties}
            >
              <div className="flex items-start justify-between mb-5">
                <span
                  className="tool-icon flex items-center justify-center rounded-md"
                  style={{ width: 44, height: 44 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={tool.icon} />
                  </svg>
                </span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: "var(--muted)" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>

              <h2
                className="tool-title font-mono font-bold text-lg mb-3 transition-colors duration-200"
                style={{ color: "var(--text)", letterSpacing: "-0.01em" }}
              >
                {tool.title}
              </h2>

              <p
                className="text-sm leading-relaxed mb-6 font-light"
                style={{ color: "var(--muted)" }}
              >
                {tool.description}
              </p>

              <div className="flex gap-2 flex-wrap">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-1 rounded-sm border"
                    style={{
                      color: "var(--muted)",
                      borderColor: "var(--border)",
                      background: "var(--surface2)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Broker affiliate slot */}
        <BrokerCTA context="start trading" />

        {/* Ad */}
        <div className="mt-12">
          <AdUnit />
        </div>
      </section>

      {/* SEO content + FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-24 font-light leading-relaxed" style={{ color: "var(--muted)" }}>
        <h2 className="font-mono font-bold text-2xl mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>
          Free trading calculators for every step of a trade
        </h2>
        <p className="mb-4">
          PosSize is a free, no-signup toolkit that helps traders make faster, more disciplined decisions. Before a
          trade, the <Link href="/position-size-calculator" style={{ color: "var(--accent)" }}>position size calculator</Link>{" "}
          tells you exactly how much to trade for a fixed risk, and the{" "}
          <Link href="/risk-reward-calculator" style={{ color: "var(--accent)" }}>risk/reward calculator</Link> screens
          whether a setup is worth taking. During and after, the{" "}
          <Link href="/profit-loss-calculator" style={{ color: "var(--accent)" }}>profit/loss calculator</Link> shows
          your true net result, while the{" "}
          <Link href="/pip-calculator" style={{ color: "var(--accent)" }}>pip</Link> and{" "}
          <Link href="/margin-calculator" style={{ color: "var(--accent)" }}>margin</Link> calculators handle leveraged
          forex positions. The{" "}
          <Link href="/compound-interest-calculator" style={{ color: "var(--accent)" }}>compound interest calculator</Link>{" "}
          projects long-term account growth.
        </p>
        <p className="mb-10">
          Every tool runs entirely in your browser, works on mobile, and is always free — no accounts, no paywalls, no
          limits.
        </p>

        <h2 className="font-mono font-bold text-xl mb-4" style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {homeFaqs.map((f, i) => (
            <details key={i} className="rounded-sm border p-5 group" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center gap-4" style={{ color: "var(--text)" }}>
                {f.q}
                <span className="font-mono text-lg shrink-0 transition-transform group-open:rotate-45" style={{ color: "var(--accent)" }}>+</span>
              </summary>
              <p className="mt-3 text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <JsonLd data={homeStructuredData} />
    </main>
  );
}
