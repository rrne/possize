// PosSize brand logo: an ascending-bars mark (position sizing / growth) in a
// teal badge, paired with the wordmark. Used in the nav and footer. The mark
// matches the bar-chart PWA/favicon icons for a consistent identity.
export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="psg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00e0b4" />
            <stop offset="1" stopColor="#00a98c" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#psg)" />
        {/* ascending bars knocked out in the dark base colour */}
        <rect x="7.5" y="18" width="4" height="7" rx="1.4" fill="#06121a" />
        <rect x="14" y="13" width="4" height="12" rx="1.4" fill="#06121a" />
        <rect x="20.5" y="8" width="4" height="17" rx="1.4" fill="#06121a" />
      </svg>
      <span
        className="font-bold text-lg tracking-tight"
        style={{ letterSpacing: "-0.03em", color: "var(--text)" }}
      >
        Pos<span style={{ color: "var(--accent)" }}>Size</span>
      </span>
    </span>
  );
}
