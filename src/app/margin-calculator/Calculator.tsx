"use client";

import AdUnit from "../AdUnit";
import Nav from "../Nav";
import ShareBar from "../ShareBar";
import { useDeepLink } from "../useDeepLink";
import { useState, useCallback } from "react";

const LEVERAGES = [1, 5, 10, 20, 30, 50, 100, 200, 500];

export default function MarginCalculator() {
  const [balance, setBalance] = useState("10000");
  const [units, setUnits] = useState("10000");
  const [price, setPrice] = useState("1.1000");
  const [leverage, setLeverage] = useState("30");
  const [rate, setRate] = useState("1");

  useDeepLink(
    { balance, units, price, leverage, rate },
    { balance: setBalance, units: setUnits, price: setPrice, leverage: setLeverage, rate: setRate },
  );

  const calc = useCallback(() => {
    const u = parseFloat(units) || 0;
    const p = parseFloat(price) || 0;
    const lev = parseFloat(leverage) || 0;
    const r = parseFloat(rate) || 0;
    const bal = parseFloat(balance) || 0;

    if (u <= 0 || p <= 0 || lev <= 0 || r <= 0) {
      return null;
    }

    const notional = u * p * r;
    const requiredMargin = notional / lev;
    const marginPct = 100 / lev;
    const accountPct = bal > 0 ? (requiredMargin / bal) * 100 : null;
    const remaining = bal > 0 ? bal - requiredMargin : null;

    return { notional, requiredMargin, marginPct, accountPct, remaining };
  }, [units, price, leverage, rate, balance]);

  const result = calc();

  const fmt = (n: number, d = 2) =>
    n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  const overMargin = result?.remaining != null && result.remaining < 0;

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Nav current="margin-calculator" />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border px-3 py-1.5 rounded-sm mb-6"
            style={{ color: "var(--accent)", borderColor: "rgba(0,212,170,0.45)", background: "rgba(0,212,170,0.12)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            Leverage
          </div>
          <h1 className="font-mono font-bold mb-3" style={{ fontSize: "clamp(24px, 5vw, 36px)", letterSpacing: "-0.02em" }}>
            Margin <span style={{ color: "var(--accent)" }}>Calculator</span>
          </h1>
          <p className="font-light leading-relaxed" style={{ color: "var(--muted)" }}>
            Calculate the margin required to open a leveraged position, plus its notional value and impact on your account.
          </p>
        </div>

        {/* Input: Position */}
        <div className="rounded-sm border p-8 mb-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="font-mono text-xs tracking-widest uppercase pb-4 mb-6 border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            01 — Position
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "Position Size (Units)", value: units, set: setUnits, hint: "Number of units / shares / contracts", prefix: "" },
              { label: "Entry Price", value: price, set: setPrice, hint: "Price per unit", prefix: "$" },
            ].map(({ label, value, set, hint, prefix }) => (
              <div key={label} className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>{label}</label>
                <div className="relative flex items-center">
                  {prefix && <span className="absolute left-4 font-mono text-sm" style={{ color: "var(--muted)" }}>{prefix}</span>}
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="w-full rounded-sm border font-mono text-sm py-3 pr-4 outline-none transition-all"
                    style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)", paddingLeft: prefix ? "2rem" : "1rem" }}
                  />
                </div>
                <span className="text-xs" style={{ color: "var(--muted)" }}>{hint}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Input: Leverage */}
        <div className="rounded-sm border p-8 mb-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="font-mono text-xs tracking-widest uppercase pb-4 mb-6 border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            02 — Leverage &amp; Account
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>
              Leverage — <span className="font-mono" style={{ color: "var(--accent)" }}>{leverage}:1</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {LEVERAGES.map((l) => {
                const active = String(l) === leverage;
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLeverage(String(l))}
                    className="rounded-sm border font-mono text-xs py-3 transition-all"
                    style={{
                      background: active ? "rgba(0,212,170,0.1)" : "var(--surface2)",
                      borderColor: active ? "var(--accent)" : "var(--border)",
                      color: active ? "var(--accent)" : "var(--muted)",
                    }}
                  >
                    {l}:1
                  </button>
                );
              })}
            </div>
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
              <span className="text-xs" style={{ color: "var(--muted)" }}>Optional — to see margin impact</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>Quote → Account Rate</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full rounded-sm border font-mono text-sm py-3 px-4 outline-none transition-all"
                style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}
              />
              <span className="text-xs" style={{ color: "var(--muted)" }}>Use 1 if priced in your account currency</span>
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
              Required Margin
            </div>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-mono font-bold" style={{ fontSize: "clamp(36px, 9vw, 60px)", color: "var(--accent)", lineHeight: 1 }}>
                ${fmt(result.requiredMargin)}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Notional Value", value: `$${fmt(result.notional)}`, color: "var(--text)" },
                { label: "Margin Requirement", value: `${fmt(result.marginPct, 2)}%`, color: "var(--accent2)" },
                { label: "Leverage", value: `${leverage}:1`, color: "var(--text)" },
                ...(result.accountPct != null
                  ? [
                      { label: "% of Account", value: `${fmt(result.accountPct, 1)}%`, color: overMargin ? "var(--danger)" : "var(--accent)" },
                      { label: "Remaining Balance", value: `$${fmt(result.remaining ?? 0)}`, color: overMargin ? "var(--danger)" : "var(--text)" },
                    ]
                  : []),
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-sm border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>{label}</div>
                  <div className="font-mono font-bold text-lg" style={{ color }}>{value}</div>
                </div>
              ))}
            </div>

            {overMargin && (
              <div className="rounded-sm border px-4 py-3 text-sm mb-6 flex items-center gap-2" style={{ background: "rgba(255,68,68,0.08)", borderColor: "rgba(255,68,68,0.2)", color: "#ff8888" }}>
                ⚠ Required margin exceeds your account balance — this position cannot be opened.
              </div>
            )}

            {/* Formula */}
            <div className="rounded-sm border px-5 py-4 font-mono text-xs leading-7" style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--muted)" }}>
              Required Margin = <span style={{ color: "var(--accent)" }}>Notional Value</span> ÷ <span style={{ color: "var(--accent)" }}>Leverage</span>
              <br />= <span style={{ color: "var(--accent)" }}>${fmt(result.notional)}</span> ÷ <span style={{ color: "var(--accent)" }}>{leverage}</span> = <span style={{ color: "var(--accent)" }}>${fmt(result.requiredMargin)}</span>
            </div>
          </div>
        )}

        {/* Footer */}
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
