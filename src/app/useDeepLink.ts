"use client";

import { useEffect, useRef } from "react";

// Keeps a calculator's inputs in sync with the URL query string so any result
// can be shared as a deep link (e.g. ?balance=10000&riskPct=2). On mount it
// reads params and pushes them into the existing state setters; on change it
// writes the current values back via history.replaceState (no navigation, no
// scroll jump). Works in static export — everything runs client-side.
//
// It deliberately takes the calculator's existing `values` and `setters` maps
// so no state refactor is needed: each calculator just passes what it already
// has in scope.
//
// Restore priority on mount: URL query params first (shared deep link), then
// localStorage (the visitor's own last session on this calculator).
export function useDeepLink(
  values: Record<string, string>,
  setters: Record<string, (v: string) => void>,
) {
  const hydrated = useRef(false);

  // Seed state once on mount, from URL params or last-saved local values.
  useEffect(() => {
    const storeKey = `possize:${window.location.pathname}`;
    const sp = new URLSearchParams(window.location.search);
    const fromUrl = Object.keys(setters).some((k) => sp.get(k) !== null);

    if (fromUrl) {
      for (const key of Object.keys(setters)) {
        const v = sp.get(key);
        if (v !== null) setters[key](v);
      }
    } else {
      try {
        const saved = JSON.parse(localStorage.getItem(storeKey) || "null");
        if (saved && typeof saved === "object") {
          for (const key of Object.keys(setters)) {
            if (typeof saved[key] === "string") setters[key](saved[key]);
          }
        }
      } catch {
        // corrupt/blocked storage — ignore
      }
    }
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist current values to both the URL (shareable) and localStorage.
  const serialized = JSON.stringify(values);
  useEffect(() => {
    if (!hydrated.current) return;
    const sp = new URLSearchParams();
    for (const [key, value] of Object.entries(values)) {
      if (value !== "" && value != null) sp.set(key, value);
    }
    const qs = sp.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
    try {
      localStorage.setItem(`possize:${window.location.pathname}`, serialized);
    } catch {
      // storage blocked/full — non-fatal
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialized]);
}
