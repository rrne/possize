"use client";

import { useEffect, useRef, useState } from "react";

// AdSense publisher id (same one used in layout.tsx + ads.txt)
const AD_CLIENT = "ca-pub-6037343600471239";

// Real Ad unit slot id from the AdSense dashboard. Changing this one value
// updates every placement on the site.
export const AD_SLOT = "7271145618";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// A polite, effective display ad:
//  • Lazy-loaded — the ad only requests/renders once it scrolls near the
//    viewport, which lifts viewability (revenue) and keeps initial page load
//    light.
//  • Clearly labelled "Advertisement" and centred with a sensible max width so
//    it reads as intentional, never disguised as content.
//  • Placed in-content (after a result / inside an article), never above the
//    tool, never sticky or interstitial.
export default function AdUnit({
  slot = AD_SLOT,
  className = "",
}: {
  slot?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const [near, setNear] = useState(false);

  const enabled = slot !== "0000000000" && slot.trim() !== "";

  // Reveal when the slot is within ~500px of the viewport.
  useEffect(() => {
    if (!enabled || near) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setNear(true);
      },
      { rootMargin: "500px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled, near]);

  // Once revealed, ask AdSense to fill the unit (once).
  useEffect(() => {
    if (!near || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not loaded (blocked / offline) — ignore
    }
  }, [near]);

  if (!enabled) return null;

  return (
    <div ref={ref} className={`ad-slot ${className}`}>
      {near && (
        <>
          <span className="ad-label">Advertisement</span>
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%" }}
            data-ad-client={AD_CLIENT}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </>
      )}
    </div>
  );
}
