"use client";

import { useState } from "react";

// "Copy link" button shown beneath a calculator result. Because useDeepLink
// keeps the URL in sync with the current inputs, copying window.location.href
// yields a deep link that reproduces this exact calculation for anyone who
// opens it — good for sharing setups and earning backlinks.
export default function ShareBar() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context / permissions) — no-op.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-sm border font-mono text-xs uppercase tracking-wider px-4 py-2.5 transition-colors"
      style={{
        background: copied ? "rgba(0,212,170,0.1)" : "var(--surface)",
        borderColor: copied ? "var(--accent)" : "var(--border)",
        color: copied ? "var(--accent)" : "var(--muted)",
      }}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Link copied
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" />
          </svg>
          Copy link to this result
        </>
      )}
    </button>
  );
}
