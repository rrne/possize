"use client";

import AdUnit from "../AdUnit";
import Nav from "../Nav";
import ShareBar from "../ShareBar";
import { useDeepLink } from "../useDeepLink";
import { useState, useCallback } from "react";

export default function BreakevenCalculator() {
  const [entry, setEntry] = useState("50");
  const [shares, setShares] = useState("200");
  const [buyFee, setBuyFee] = useState("5");
  const [sellFee, setSellFee] = useState("5");
  const [tradeType, setTradeType] = useState<"long" | "short">("long");

  useDeepLink(
    { entry, shares, buyFee, sellFee, tradeType },
    { entry: setEntry, shares: setShares, buyFee: setBuyFee, sellFee: setSellFee, tradeType: (v) => setTradeType(v === "short" ? "short" : "long") },
  );

  const calc = useCallback(() => {
    const e = parseFloat(entry) || 0;
    const s = parseFloat(shares) || 0;
    const totalFees = (parseFloat(buyFee) || 0) + (parseFloat(sellFee) || 0);

    if (e <= 0 || s <= 0) {
      return null;
    }

    const feePerShare = totalFees / s;
    const breakEven = tradeType === "long" ? e + feePerShare : e - feePerShare;
    const moveNeeded = Math.abs(breakEven - e);
    const movePct = (moveNeeded / e) * 100;

    return { totalFees, feePerShare, breakEven, moveNeeded, movePct };
  }, [entry, shares, buyFee, sellFee, tradeType]);

  const result = calc();

  const fmt = (n: number, d = 2) =>
    n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Nav current="breakeven-calculator" />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border px-3 py-1.5 rounded-sm mb-6"
            style={{ color: "var(--accent)", borderColor: "rgba(0,212,170,0.45)", background: "rgba(0,212,170,0.12)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            Trade Review
          </div>
          <h1 className="font-mono font-bold mb-3" style={{ fontSize: "clamp(24px, 5vw, 36px)", letterSpacing: "-0.02em" }}>
            Break-Even <span style={{ color: "var(--accent)" }}>Calculator</span>
          </h1>
          <p className="font-light leading-relaxed" style={{ color: "var(--muted)" }}>
            Find the exact price your trade must reach to cover all fees before turning a profit.
          </p>
        </div>

        {/* Direction toggle */}
        <div className="rounded-sm border p-8 mb-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="font-mono text-xs tracking-widest uppercase pb-4 mb-6 border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            01 — Trade Details
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>Direction</label>
            <div className="grid grid-cols-2 gap-2">
              {(["long", "short"] as const).map((t) => {
                const active = t === tradeType;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTradeType(t)}
                    className="rounded-sm border font-mono text-xs uppercase tracking-wider py-3 transition-all"
                    style={{
                      background: active ? "rgba(0,212,170,0.1)" : "var(--surface2)",
                      borderColor: active ? "var(--accent)" : "var(--border)",
                      color: active ? "var(--accent)" : "var(--muted)",
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>Entry Price</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 font-mono text-sm" style={{ color: "var(--muted)" }}>$</span>
                <input
                  type="number"
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  className="w-full rounded-sm border font-mono text-sm py-3 pl-8 pr-4 outline-none transition-all"
                  style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}
                />
              </div>
              <span className="text-xs" style={{ color: "var(--muted)" }}>Price you entered the trade at</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>Shares / Units</label>
              <input
                type="number"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                className="w-full rounded-sm border font-mono text-sm py-3 px-4 outline-none transition-all"
                style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}
              />
              <span className="text-xs" style={{ color: "var(--muted)" }}>Size of your position</span>
            </div>
          </div>
        </div>

        {/* Fees */}
        <div className="rounded-sm border p-8 mb-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="font-mono text-xs tracking-widest uppercase pb-4 mb-6 border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            02 — Fees
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "Entry Commission", value: buyFee, set: setBuyFee, hint: "Fee paid to open" },
              { label: "Exit Commission", value: sellFee, set: setSellFee, hint: "Fee paid to close" },
            ].map(({ label, value, set, hint }) => (
              <div key={label} className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>{label}</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 font-mono text-sm" style={{ color: "var(--muted)" }}>$</span>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="w-full rounded-sm border font-mono text-sm py-3 pl-8 pr-4 outline-none transition-all"
                    style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}
                  />
                </div>
                <span className="text-xs" style={{ color: "var(--muted)" }}>{hint}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        {result && (
          <div
            className="rounded-sm border p-8 mb-4"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,170,0.06) 0%, rgba(0,212,170,0.02) 100%)",
              borderColor: "rgba(0,212,170,0.2)",
            }}
          >
            <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
              Break-Even Price
            </div>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-mono font-bold" style={{ fontSize: "clamp(36px, 9vw, 60px)", color: "var(--accent)", lineHeight: 1 }}>
                ${fmt(result.breakEven)}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Total Fees", value: `$${fmt(result.totalFees)}`, color: "var(--danger)" },
                { label: "Fee / Share", value: `$${fmt(result.feePerShare, 4)}`, color: "var(--text)" },
                { label: "Move Needed", value: `$${fmt(result.moveNeeded, 4)}`, color: "var(--accent2)" },
                { label: "Move %", value: `${fmt(result.movePct, 3)}%`, color: "var(--text)" },
                { label: "Direction", value: tradeType.toUpperCase(), color: "var(--accent)" },
                { label: "Entry", value: `$${fmt(parseFloat(entry) || 0)}`, color: "var(--text)" },
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-sm border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>{label}</div>
                  <div className="font-mono font-bold text-lg" style={{ color }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Formula */}
            <div className="rounded-sm border px-5 py-4 font-mono text-xs leading-7" style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--muted)" }}>
              Break-Even = <span style={{ color: "var(--accent)" }}>Entry</span> {tradeType === "long" ? "+" : "−"} (<span style={{ color: "var(--accent)" }}>Total Fees</span> ÷ <span style={{ color: "var(--accent)" }}>Shares</span>)
              <br />= <span style={{ color: "var(--accent)" }}>${fmt(parseFloat(entry) || 0)}</span> {tradeType === "long" ? "+" : "−"} (<span style={{ color: "var(--accent)" }}>${fmt(result.totalFees)}</span> ÷ <span style={{ color: "var(--accent)" }}>{fmt(parseFloat(shares) || 0, 0)}</span>) = <span style={{ color: "var(--accent)" }}>${fmt(result.breakEven)}</span>
            </div>
          </div>
        )}

        {/* Ad */}
        {/* Share */}
        <div className="mt-8">
          <ShareBar />
        </div>

        <div className="mt-8">
          <AdUnit />
        </div>
      </div>
    </main>
  );
}
