"use client";

import Link from "next/link";
import AdUnit from "../AdUnit";
import { useState, useCallback } from "react";

const PAIRS = [
  "EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD",
  "USD/CAD", "NZD/USD", "EUR/JPY", "GBP/JPY", "EUR/GBP",
];

const LOT_TYPES: { label: string; units: number }[] = [
  { label: "Standard", units: 100000 },
  { label: "Mini", units: 10000 },
  { label: "Micro", units: 1000 },
];

export default function PipCalculator() {
  const [pair, setPair] = useState("EUR/USD");
  const [lotType, setLotType] = useState("Standard");
  const [lots, setLots] = useState("1");
  const [accountCcy, setAccountCcy] = useState("USD");
  const [convRate, setConvRate] = useState("1");

  const quoteCcy = pair.split("/")[1] ?? "USD";

  const calc = useCallback(() => {
    const numLots = parseFloat(lots) || 0;
    const rate = parseFloat(convRate) || 0;
    const lotUnits = LOT_TYPES.find((l) => l.label === lotType)?.units ?? 100000;

    const pipSize = pair.includes("JPY") ? 0.01 : 0.0001;
    const units = lotUnits * numLots;

    if (units <= 0 || rate <= 0) {
      return null;
    }

    const pipValueQuote = pipSize * units;
    const pipValueAcct = pipValueQuote * rate;
    const perStandardLot = pipSize * 100000 * rate;

    return { pipSize, units, pipValueQuote, pipValueAcct, perStandardLot };
  }, [pair, lotType, lots, convRate]);

  const result = calc();

  const fmt = (n: number, d = 2) =>
    n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  const sameCcy = accountCcy.trim().toUpperCase() === quoteCcy.toUpperCase();

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="font-mono font-bold text-lg tracking-tight" style={{ color: "var(--accent)" }}>
            PosSize
          </Link>
          <Link href="/" className="font-mono text-xs tracking-widest uppercase flex items-center gap-2" style={{ color: "var(--muted)" }}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Tools
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border px-3 py-1.5 rounded-sm mb-6"
            style={{ color: "var(--accent)", borderColor: "rgba(0,212,170,0.25)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            Forex
          </div>
          <h1 className="font-mono font-bold mb-3" style={{ fontSize: "clamp(24px, 5vw, 36px)", letterSpacing: "-0.02em" }}>
            Pip <span style={{ color: "var(--accent)" }}>Calculator</span>
          </h1>
          <p className="font-light leading-relaxed" style={{ color: "var(--muted)" }}>
            Calculate the monetary value of a single pip for any currency pair and lot size, in your account currency.
          </p>
        </div>

        {/* Input: Pair & Size */}
        <div className="rounded-sm border p-8 mb-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="font-mono text-xs tracking-widest uppercase pb-4 mb-6 border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            01 — Pair &amp; Position Size
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>Currency Pair</label>
              <select
                value={pair}
                onChange={(e) => setPair(e.target.value)}
                className="w-full rounded-sm border font-mono text-sm py-3 px-4 outline-none transition-all cursor-pointer"
                style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}
              >
                {PAIRS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                Pip size: {pair.includes("JPY") ? "0.01 (JPY pair)" : "0.0001"}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>Lot Type</label>
              <div className="grid grid-cols-3 gap-2">
                {LOT_TYPES.map((l) => {
                  const active = l.label === lotType;
                  return (
                    <button
                      key={l.label}
                      type="button"
                      onClick={() => setLotType(l.label)}
                      className="rounded-sm border font-mono text-xs py-3 transition-all"
                      style={{
                        background: active ? "rgba(0,212,170,0.1)" : "var(--surface2)",
                        borderColor: active ? "var(--accent)" : "var(--border)",
                        color: active ? "var(--accent)" : "var(--muted)",
                      }}
                    >
                      {l.label}
                    </button>
                  );
                })}
              </div>
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                {LOT_TYPES.find((l) => l.label === lotType)?.units.toLocaleString()} units per lot
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>Number of Lots</label>
              <input
                type="number"
                value={lots}
                onChange={(e) => setLots(e.target.value)}
                className="w-full rounded-sm border font-mono text-sm py-3 px-4 outline-none transition-all"
                style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}
              />
              <span className="text-xs" style={{ color: "var(--muted)" }}>How many lots you are trading</span>
            </div>
          </div>
        </div>

        {/* Input: Account */}
        <div className="rounded-sm border p-8 mb-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="font-mono text-xs tracking-widest uppercase pb-4 mb-6 border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            02 — Account Currency
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>Account Currency</label>
              <input
                type="text"
                value={accountCcy}
                onChange={(e) => setAccountCcy(e.target.value.toUpperCase())}
                maxLength={3}
                className="w-full rounded-sm border font-mono text-sm py-3 px-4 outline-none transition-all uppercase"
                style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}
              />
              <span className="text-xs" style={{ color: "var(--muted)" }}>The currency your account is denominated in</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                {quoteCcy} → {accountCcy || "ACCT"} Rate
              </label>
              <input
                type="number"
                value={convRate}
                onChange={(e) => setConvRate(e.target.value)}
                className="w-full rounded-sm border font-mono text-sm py-3 px-4 outline-none transition-all"
                style={{
                  background: "var(--surface2)",
                  borderColor: sameCcy && parseFloat(convRate) !== 1 ? "var(--accent2)" : "var(--border)",
                  color: "var(--text)",
                }}
              />
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                {sameCcy
                  ? `${quoteCcy} is your account currency — use 1`
                  : `How much 1 ${quoteCcy} is worth in ${accountCcy || "your currency"}`}
              </span>
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
              Value Per Pip
            </div>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-mono font-bold" style={{ fontSize: "clamp(36px, 9vw, 60px)", color: "var(--accent)", lineHeight: 1 }}>
                {fmt(result.pipValueAcct)}
              </span>
              <span className="font-mono text-xl" style={{ color: "var(--muted)" }}>{accountCcy || ""} / pip</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {[
                { label: `Pip Value (${quoteCcy})`, value: `${fmt(result.pipValueQuote)}`, color: "var(--text)" },
                { label: "Total Units", value: result.units.toLocaleString(), color: "var(--accent2)" },
                { label: "Pip Size", value: result.pipSize.toString(), color: "var(--text)" },
                { label: "Per Standard Lot", value: `${fmt(result.perStandardLot)} ${accountCcy || ""}`, color: "var(--accent)" },
                { label: "Per 10 Pips", value: `${fmt(result.pipValueAcct * 10)} ${accountCcy || ""}`, color: "var(--text)" },
                { label: "Per 100 Pips", value: `${fmt(result.pipValueAcct * 100)} ${accountCcy || ""}`, color: "var(--text)" },
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-sm border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>{label}</div>
                  <div className="font-mono font-bold text-lg" style={{ color }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Formula */}
            <div className="rounded-sm border px-5 py-4 font-mono text-xs leading-7" style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--muted)" }}>
              Pip Value = <span style={{ color: "var(--accent)" }}>Pip Size</span> × <span style={{ color: "var(--accent)" }}>Units</span> × <span style={{ color: "var(--accent)" }}>Rate</span>
              <br />= <span style={{ color: "var(--accent)" }}>{result.pipSize}</span> × <span style={{ color: "var(--accent)" }}>{result.units.toLocaleString()}</span> × <span style={{ color: "var(--accent)" }}>{fmt(parseFloat(convRate) || 0, 4)}</span> = <span style={{ color: "var(--accent)" }}>{fmt(result.pipValueAcct)} {accountCcy || ""}</span>
            </div>
          </div>
        )}

        {/* Footer */}
        {/* Ad */}
        <div className="mt-8">
          <AdUnit />
        </div>

      </div>
    </main>
  );
}
