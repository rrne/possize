import Link from "next/link";

// Shared top header used on content/legal pages. Mirrors the inline header
// on the calculator pages (logo + "All Tools" back link).
export default function SiteHeader() {
  return (
    <header className="border-b" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-mono font-bold text-lg tracking-tight" style={{ color: "var(--accent)" }}>
          PosSize
        </Link>
        <Link
          href="/"
          className="font-mono text-xs tracking-widest uppercase flex items-center gap-2"
          style={{ color: "var(--muted)" }}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Tools
        </Link>
      </div>
    </header>
  );
}
