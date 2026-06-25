import SiteHeader from "./SiteHeader";

// Shared shell for static content pages (legal, about, contact). Renders the
// site header + a centered prose article. The global Footer (in layout.tsx)
// supplies the footer, so pages only provide their title + body.
export default function ContentLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      <SiteHeader />
      <article className="max-w-3xl mx-auto px-6 py-14 w-full">
        <h1
          className="font-mono font-bold mb-3"
          style={{ fontSize: "clamp(26px, 5vw, 38px)", letterSpacing: "-0.02em", color: "var(--text)" }}
        >
          {title}
        </h1>
        {updated && (
          <p className="font-mono text-xs mb-10" style={{ color: "var(--muted)" }}>
            Last updated: {updated}
          </p>
        )}
        <div
          className="prose-content font-light leading-relaxed space-y-4"
          style={{ color: "var(--muted)" }}
        >
          {children}
        </div>
      </article>
    </main>
  );
}
