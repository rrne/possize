import Link from "next/link";
import { TOOLS, TOOL_ORDER } from "./seo/tools";

// Shared site footer. Rendered globally in layout.tsx so every page —
// home, calculators, legal pages — carries the same internal links and
// legal navigation. The legal links (Privacy/Terms) are required for
// AdSense compliance and help E-E-A-T for this finance (YMYL) niche.
export default function Footer() {
  return (
    <footer className="border-t mt-auto" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="font-mono font-bold text-lg" style={{ color: "var(--accent)" }}>
              PosSize
            </Link>
            <p className="text-xs mt-3 font-light leading-relaxed" style={{ color: "var(--muted)" }}>
              Free, no-signup trading calculators for serious traders.
            </p>
          </div>

          {/* Tools */}
          <div>
            <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)" }}>
              Calculators
            </div>
            <ul className="space-y-2">
              {TOOL_ORDER.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="text-sm font-light transition-colors"
                    style={{ color: "var(--muted)" }}
                  >
                    {TOOLS[slug].name.replace(" Calculator", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)" }}>
              Company
            </div>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm font-light" style={{ color: "var(--muted)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)" }}>
              Legal
            </div>
            <ul className="space-y-2">
              {[
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Use" },
                { href: "/disclaimer", label: "Risk Disclaimer" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm font-light" style={{ color: "var(--muted)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            © 2026 PosSize. All rights reserved.
          </span>
          <span className="font-mono text-xs text-center" style={{ color: "var(--muted)" }}>
            For educational purposes only. Not financial advice.
          </span>
        </div>
      </div>
    </footer>
  );
}
