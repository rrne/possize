"use client";

import { useEffect, useRef } from "react";

// AdSense publisher id (same one used in layout.tsx + ads.txt)
const AD_CLIENT = "ca-pub-6037343600471239";

// Replace "0000000000" with the real Ad unit slot id from your AdSense
// dashboard (Ads → By ad unit → create a "Display" unit → copy data-ad-slot).
// Changing this one value updates every placement on the site.
export const AD_SLOT = "7271145618";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdUnit({
  slot = AD_SLOT,
  className = "",
}: {
  slot?: string;
  className?: string;
}) {
  const pushed = useRef(false);
  // Until a real Ad unit slot id is configured, render nothing. This keeps
  // broken/empty <ins> elements off the live site; Auto ads (enabled in the
  // AdSense dashboard) still work via the script in layout.tsx.
  const enabled = slot !== "0000000000" && slot.trim() !== "";

  useEffect(() => {
    if (!enabled || pushed.current) return; // guard against strict-mode double effect
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not loaded (blocked / offline) — ignore
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block" }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
