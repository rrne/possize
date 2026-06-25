import Link from "next/link";

const tools = [
  {
    href: "/position-size-calculator",
    number: "01",
    title: "Position Size Calculator",
    description:
      "Calculate the optimal number of shares or contracts based on your account size and risk tolerance.",
    tags: ["Risk Management", "Essential"],
    accent: true,
  },
  {
    href: "/risk-reward-calculator",
    number: "02",
    title: "Risk/Reward Calculator",
    description:
      "Evaluate trade quality by calculating risk/reward ratio and expected value before entering a position.",
    tags: ["Trade Planning"],
    accent: false,
  },
  {
    href: "/compound-interest-calculator",
    number: "03",
    title: "Compound Interest Calculator",
    description:
      "Visualize how your trading account grows over time with consistent returns and compounding.",
    tags: ["Growth", "Long-term"],
    accent: false,
  },
  {
    href: "/profit-loss-calculator",
    number: "04",
    title: "Profit / Loss Calculator",
    description:
      "Quickly calculate profit or loss on any trade including commissions and fees.",
    tags: ["Trade Review"],
    accent: false,
  },
  {
    href: "/pip-calculator",
    number: "05",
    title: "Pip Calculator",
    description:
      "Calculate the monetary value of a single pip for any forex pair and lot size in your account currency.",
    tags: ["Forex"],
    accent: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <header
        className="border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <span
            className="font-mono font-bold text-lg tracking-tight"
            style={{ color: "var(--accent)" }}
          >
            PosSize
          </span>
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: "var(--muted)" }}
          >
            Trading Tools
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border px-3 py-1.5 rounded-sm mb-8"
          style={{
            color: "var(--accent)",
            borderColor: "rgba(0,212,170,0.25)",
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
      </section>

      {/* Tools Grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block p-8 rounded-sm border transition-all duration-200"
              style={{
                background: tool.accent
                  ? "linear-gradient(135deg, rgba(0,212,170,0.06) 0%, rgba(0,212,170,0.02) 100%)"
                  : "var(--surface)",
                borderColor: tool.accent
                  ? "rgba(0,212,170,0.2)"
                  : "var(--border)",
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <span
                  className="font-mono text-xs tracking-widest"
                  style={{ color: "var(--muted)" }}
                >
                  {tool.number}
                </span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: "var(--muted)" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </div>

              <h2
                className="font-mono font-bold text-lg mb-3 transition-colors duration-200"
                style={{
                  color: tool.accent ? "var(--accent)" : "var(--text)",
                  letterSpacing: "-0.01em",
                }}
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
      </section>

      {/* Footer */}
      <footer
        className="border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <span
            className="font-mono font-bold"
            style={{ color: "var(--accent)" }}
          >
            PosSize
          </span>
          <span
            className="font-mono text-xs"
            style={{ color: "var(--muted)" }}
          >
            For educational purposes only. Not financial advice.
          </span>
        </div>
      </footer>
    </main>
  );
}
