import Link from "next/link";
import Logo from "./Logo";
import { TOOLS, TOOL_ORDER } from "./seo/tools";

// Universal top navigation: brand + a "Tools" dropdown listing every
// calculator. Used on the home page, all calculator pages, and content pages
// so a visitor landing from Google on one tool can immediately discover the
// rest — lifting pages-per-session (and ad impressions).
//
// Pure CSS dropdown via <details>/<summary> (same pattern as the FAQ
// accordions) — no client JS, no hydration concerns, works in static export.
export default function Nav({ current, wide = false }: { current?: string; wide?: boolean }) {
  return (
    <header className="border-b" style={{ borderColor: "var(--border)", position: "relative", zIndex: 30 }}>
      <div
        className={`${wide ? "max-w-5xl" : "max-w-3xl"} mx-auto px-6 py-5 flex items-center justify-between`}
      >
        <Link href="/" aria-label="PosSize home" className="inline-flex items-center">
          <Logo />
        </Link>

        <nav className="flex items-center gap-5">
        <Link
          href="/guides"
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: "var(--muted)" }}
        >
          Guides
        </Link>
        <details className="nav-tools">
          <summary
            className="font-mono text-xs tracking-widest uppercase flex items-center gap-2 border rounded-sm px-3 py-2"
            style={{ color: "var(--accent)", borderColor: "rgba(0,212,170,0.3)" }}
          >
            All Tools
            <svg className="nav-chevron w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="nav-menu" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            {TOOL_ORDER.map((slug) => {
              const active = slug === current;
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="nav-menu-item font-mono text-sm flex items-center justify-between gap-4"
                  style={{ color: active ? "var(--accent)" : "var(--text)" }}
                >
                  <span>{TOOLS[slug].name.replace(" Calculator", "")}</span>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>{TOOLS[slug].category}</span>
                </Link>
              );
            })}
          </div>
        </details>
        </nav>
      </div>
    </header>
  );
}
