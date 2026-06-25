"use client";

import AdUnit from "../AdUnit";
import Nav from "../Nav";
import ShareBar from "../ShareBar";
import { useDeepLink } from "../useDeepLink";
import { useState, useCallback } from "react";

export default function LotSizeCalculator() {
  const [balance, setBalance] = useState("10000");
  const [riskPct, setRiskPct] = useState("1");
  const [stopPips, setStopPips] = useState("25");
  const [pipValue, setPipValue] = useState("10");

  useDeepLink(
    { balance, riskPct, stopPips, pipValue },
    { balance: setBalance, riskPct: setRiskPct, stopPips: setStopPips, pipValue: setPipValue },
  );

  const calc = useCallback(() => {
    const b = parseFloat(balance) || 0;
    const r = parseFloat(riskPct) || 0;
    const sp = parseFloat(stopPips) || 0;
    const pv = parseFloat(pipValue) || 0;

    const riskAmount = b * (r / 100);

    if (b <= 0 || sp <= 0 || pv <= 0) {
      return null;
    }

    const lots = riskAmount / (sp * pv);
    const units = lots * 100000;
    const lossAtStop = lots * sp * pv;

    return { riskAmount, lots, units, lossAtStop };
  }, [balance, riskPct, stopPips, pipValue]);

  const result = calc();

  const fmt = (n: number, d = 2) =>
    n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  const isHighRisk = parseFloat(riskPct) > 3;

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Nav current="lot-size-calculator" />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border px-3 py-1.5 rounded-sm mb-6"
            style={{ color: "var(--accent)", borderColor: "rgba(0,212,170,0.45)", background: "rgba(0,212,170,0.12)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            Forex
          </div>
          <h1 className="font-mono font-bold mb-3" style={{ fontSize: "clamp(24px, 5vw, 36px)", letterSpacing: "-0.02em" }}>
            Lot Size <span style={{ color: "var(--accent)" }}>Calculator</span>
          </h1>
          <p className="font-light leading-relaxed" style={{ color: "var(--muted)" }}>
            Find the exact number of lots to trade for a fixed risk, based on your stop-loss in pips.
          </p>
        </div>

        {/* Input: Risk */}
        <div className="rounded-sm border p-8 mb-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="font-mono text-xs tracking-widest uppercase pb-4 mb-6 border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            01 — Account &amp; Risk
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>Account Balance</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 font-mono text-sm" style={{ color: "var(--muted)" }}>$</span>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full rounded-sm border font-mono text-sm py-3 pl-8 pr-4 outline-none transition-all"
                  style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}
                />
              </div>
              <span className="text-xs" style={{ color: "var(--muted)" }}>Total trading capital</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                Risk Per Trade —{" "}
                <span className="font-mono" style={{ color: "var(--accent)" }}>{riskPct}%</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  value={riskPct}
                  onChange={(e) => setRiskPct(e.target.value)}
                  className="w-full rounded-sm border font-mono text-sm py-3 pl-4 pr-8 outline-none transition-all"
                  style={{ background: "var(--surface2)", borderColor: isHighRisk ? "var(--danger)" : "var(--border)", color: "var(--text)" }}
                />
                <span className="absolute right-4 font-mono text-sm" style={{ color: "var(--muted)" }}>%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={Math.min(parseFloat(riskPct) || 1, 10)}
                onChange={(e) => setRiskPct(e.target.value)}
                className="w-full mt-1 cursor-pointer"
                style={{ accentColor: "var(--accent)" }}
              />
              <span className="text-xs" style={{ color: "var(--muted)" }}>Recommended: 1–2% per trade</span>
            </div>
          </div>
        </div>

        {/* Input: Trade */}
        <div className="rounded-sm border p-8 mb-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="font-mono text-xs tracking-widest uppercase pb-4 mb-6 border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            02 — Stop-Loss &amp; Pip Value
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>Stop-Loss (pips)</label>
              <input
                type="number"
                value={stopPips}
                onChange={(e) => setStopPips(e.target.value)}
                className="w-full rounded-sm border font-mono text-sm py-3 px-4 outline-none transition-all"
                style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}
              />
              <span className="text-xs" style={{ color: "var(--muted)" }}>Distance from entry to stop, in pips</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>Pip Value / Standard Lot</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 font-mono text-sm" style={{ color: "var(--muted)" }}>$</span>
                <input
                  type="number"
                  value={pipValue}
                  onChange={(e) => setPipValue(e.target.value)}
                  className="w-full rounded-sm border font-mono text-sm py-3 pl-8 pr-4 outline-none transition-all"
                  style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}
                />
              </div>
              <span className="text-xs" style={{ color: "var(--muted)" }}>≈ $10 for most USD-quoted pairs</span>
            </div>
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
              Recommended Lot Size
            </div>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-mono font-bold" style={{ fontSize: "clamp(40px, 10vw, 64px)", color: "var(--accent)", lineHeight: 1 }}>
                {fmt(result.lots)}
              </span>
              <span className="font-mono text-xl" style={{ color: "var(--muted)" }}>lots</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Risk Amount", value: `$${fmt(result.riskAmount)}`, color: "var(--danger)" },
                { label: "Units", value: fmt(result.units, 0), color: "var(--text)" },
                { label: "Mini Lots", value: fmt(result.lots * 10), color: "var(--accent2)" },
                { label: "Micro Lots", value: fmt(result.lots * 100), color: "var(--text)" },
                { label: "Loss at Stop", value: `$${fmt(result.lossAtStop)}`, color: "var(--danger)" },
                { label: "Std Lots", value: fmt(result.lots), color: "var(--accent)" },
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-sm border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>{label}</div>
                  <div className="font-mono font-bold text-lg" style={{ color }}>{value}</div>
                </div>
              ))}
            </div>

            {isHighRisk && (
              <div className="rounded-sm border px-4 py-3 text-sm mb-6 flex items-center gap-2" style={{ background: "rgba(255,68,68,0.08)", borderColor: "rgba(255,68,68,0.2)", color: "#ff8888" }}>
                ⚠ Risk exceeds 3% — consider reducing your position size.
              </div>
            )}

            {/* Formula */}
            <div className="rounded-sm border px-5 py-4 font-mono text-xs leading-7" style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--muted)" }}>
              Lots = <span style={{ color: "var(--accent)" }}>Risk ($)</span> ÷ (<span style={{ color: "var(--accent)" }}>Stop pips</span> × <span style={{ color: "var(--accent)" }}>Pip value</span>)
              <br />= <span style={{ color: "var(--accent)" }}>${fmt(result.riskAmount)}</span> ÷ (<span style={{ color: "var(--accent)" }}>{fmt(parseFloat(stopPips) || 0, 0)}</span> × <span style={{ color: "var(--accent)" }}>${fmt(parseFloat(pipValue) || 0)}</span>) = <span style={{ color: "var(--accent)" }}>{fmt(result.lots)} lots</span>
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
