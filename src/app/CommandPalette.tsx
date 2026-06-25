"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { TOOLS, TOOL_ORDER } from "./seo/tools";
import { GUIDES, GUIDE_ORDER } from "./guides/content";

type Item = { name: string; href: string; hint: string; kind: "Calculator" | "Guide" | "Page" };

const ITEMS: Item[] = [
  ...TOOL_ORDER.map((s) => ({ name: TOOLS[s].name, href: `/${s}`, hint: TOOLS[s].category, kind: "Calculator" as const })),
  ...GUIDE_ORDER.map((s) => ({ name: GUIDES[s].title, href: `/guides/${s}`, hint: GUIDES[s].readTime, kind: "Guide" as const })),
  { name: "All Calculators", href: "/", hint: "Home", kind: "Page" },
  { name: "Guides", href: "/guides", hint: "All guides", kind: "Page" },
  { name: "About", href: "/about", hint: "About PosSize", kind: "Page" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Global open/close shortcuts + delegated trigger clicks.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setActive(0);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-command-trigger]")) {
        e.preventDefault();
        setOpen(true);
        setQuery("");
        setActive(0);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Focus the field when the palette opens (no state writes → effect-safe).
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const q = query.trim().toLowerCase();
  const results = q
    ? ITEMS.filter((i) => (i.name + " " + i.hint).toLowerCase().includes(q))
    : ITEMS;

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      className="cmdk-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="cmdk-panel" style={{ background: "var(--surface)", borderColor: "var(--border)" }} role="dialog" aria-modal="true" aria-label="Search">
        <div className="cmdk-input-row" style={{ borderColor: "var(--border)" }}>
          <svg className="w-4 h-4 shrink-0" style={{ color: "var(--faint)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                const r = results[active];
                if (r) go(r.href);
              }
            }}
            placeholder="Search calculators and guides…"
            className="cmdk-input"
            style={{ color: "var(--text)" }}
            spellCheck={false}
            autoComplete="off"
          />
          <kbd className="cmdk-kbd" style={{ color: "var(--faint)", borderColor: "var(--border)" }}>esc</kbd>
        </div>

        <div className="cmdk-list">
          {results.length === 0 && (
            <div className="cmdk-empty" style={{ color: "var(--muted)" }}>No results for “{query}”.</div>
          )}
          {results.map((r, i) => (
            <button
              key={r.href + r.name}
              type="button"
              onMouseMove={() => setActive(i)}
              onClick={() => go(r.href)}
              className="cmdk-item"
              data-active={i === active ? "true" : undefined}
              style={{ color: "var(--text)" }}
            >
              <span className="cmdk-item-name">{r.name}</span>
              <span className="cmdk-item-hint" style={{ color: "var(--faint)" }}>{r.kind} · {r.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
