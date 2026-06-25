import Link from "next/link";

// Broker affiliate placement. Trading calculators monetize far better via
// broker CPA (cost-per-acquisition) affiliate deals than via display ads,
// because the visitor is an active, high-intent trader.
//
// HOW TO GO LIVE:
//  1. Sign up for a broker affiliate / partner program (e.g. IC Markets,
//     Pepperstone, eToro Partners, Exness, Plus500 — pick regulated ones).
//  2. Replace `href: "#"` below with your tracked affiliate URL.
//  3. Set `LIVE = true`. Until then this renders a neutral, non-clickable
//     placeholder so nothing misleading ships.
//
// Disclosure: affiliate relationships are disclosed in /privacy-policy and
// /terms, satisfying FTC-style disclosure requirements.

const LIVE = false;

type Broker = {
  name: string;
  blurb: string;
  href: string;
};

const BROKERS: Broker[] = [
  { name: "Broker slot 1", blurb: "Low spreads · regulated · fast execution", href: "#" },
  { name: "Broker slot 2", blurb: "Beginner friendly · demo account", href: "#" },
];

export default function BrokerCTA({ context = "trade" }: { context?: string }) {
  if (!LIVE) {
    // Placeholder until affiliate links are wired. Kept visible in dev only via
    // a subtle dashed box; renders nothing in the shipped bundle would be ideal,
    // but we keep a quiet teaser so the layout slot is reserved and reviewable.
    return null;
  }

  return (
    <section
      className="rounded-sm border p-6 mt-8"
      style={{
        background: "linear-gradient(135deg, rgba(255,107,53,0.06) 0%, rgba(255,107,53,0.02) 100%)",
        borderColor: "rgba(255,107,53,0.25)",
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent2)" }}>
          Ready to {context}?
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>
          Ad · Partner
        </span>
      </div>
      <p className="text-sm font-light mb-5" style={{ color: "var(--muted)" }}>
        Put your numbers to work with a regulated broker. These are partners we feature — see our{" "}
        <Link href="/terms" style={{ color: "var(--accent)" }}>
          disclosure
        </Link>
        .
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BROKERS.map((b) => (
          <a
            key={b.name}
            href={b.href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="rounded-sm border p-4 flex flex-col gap-1 transition-colors"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <span className="font-mono font-bold text-sm" style={{ color: "var(--text)" }}>
              {b.name}
            </span>
            <span className="text-xs font-light" style={{ color: "var(--muted)" }}>
              {b.blurb}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
