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
export function useDeepLink(
  values: Record<string, string>,
  setters: Record<string, (v: string) => void>,
) {
  const hydrated = useRef(false);

  // Read params once on mount and seed state.
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    for (const key of Object.keys(setters)) {
      const v = sp.get(key);
      if (v !== null) setters[key](v);
    }
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Write current values back to the URL after hydration.
  const serialized = JSON.stringify(values);
  useEffect(() => {
    if (!hydrated.current) return;
    const sp = new URLSearchParams();
    for (const [key, value] of Object.entries(values)) {
      if (value !== "" && value != null) sp.set(key, value);
    }
    const qs = sp.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialized]);
}
