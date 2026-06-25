"use client";

import AdUnit from "../AdUnit";
import Nav from "../Nav";
import ShareBar from "../ShareBar";
import { useDeepLink } from "../useDeepLink";
import { useState, useCallback } from "react";

export default function ProfitLossCalculator() {
  const [entryPrice, setEntryPrice] = useState("150");
  const [exitPrice, setExitPrice] = useState("165");
  const [shares, setShares] = useState("100");
  const [commission, setCommission] = useState("0");
  const [tradeType, setTradeType] = useState<"long" | "short">("long");
  
  useDeepLink(
    { entryPrice, exitPrice, shares, commission, tradeType },
    { entryPrice: setEntryPrice, exitPrice: setExitPrice, shares: setShares, commission: setCommission, tradeType: (v) => setTradeType(v === "short" ? "short" : "long") },
  );

  const calc = useCallback(() => {
    const e = parseFloat(entryPrice) || 0;
    const x = parseFloat(exitPrice) || 0;
    const s = parseFloat(shares) || 0;
    const c = parseFloat(commission) || 0;
    
    if (e <= 0 || x <= 0 || s <= 0) return null;
    
    const priceDiff = tradeType === "long" ? x - e : e - x;
    const grossPnL = priceDiff * s;
    const totalCommission = c * 2;
    const netPnL = grossPnL - totalCommission;
    const returnPct = (priceDiff / e) * 100;
    const totalInvested = e * s;
    const netReturnPct = (netPnL / totalInvested) * 100;
    const isProfit = netPnL >= 0;
    
    return { grossPnL, netPnL, returnPct, netReturnPct, totalInvested, totalCommission, isProfit, priceDiff };
  }, [entryPrice, exitPrice, shares, commission, tradeType]);
  
  const result = calc();
  
  const fmt = (n: number, d = 2) =>
    n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Nav current="profit-loss-calculator" />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border px-3 py-1.5 rounded-sm mb-6"
            style={{ color: "var(--accent)", borderColor: "rgba(0,212,170,0.25)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            Trade Review
          </div>
          <h1 className="font-mono font-bold mb-3" style={{ fontSize: "clamp(24px, 5vw, 36px)", letterSpacing: "-0.02em" }}>
            Profit / Loss <span style={{ color: "var(--accent)" }}>Calculator</span>
          </h1>
          <p className="font-light leading-relaxed" style={{ color: "var(--muted)" }}>
            Calculate your exact profit or loss on any trade including commissions and fees.
          </p>
        </div>
        
        {/* Trade Type Toggle */}
        <div className="rounded-sm border p-8 mb-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="font-mono text-xs tracking-widest uppercase pb-4 mb-6 border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            01 — Trade Type
          </div>
          <div className="flex gap-3 mb-2">
            {(["long", "short"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTradeType(type)}
                className="flex-1 py-3 font-mono text-sm font-bold uppercase tracking-widest rounded-sm border transition-all duration-200"
                style={{
                  background: tradeType === type
                    ? type === "long" ? "rgba(0,212,170,0.1)" : "rgba(255,68,68,0.1)"
                    : "var(--surface2)",
                  borderColor: tradeType === type
                    ? type === "long" ? "var(--accent)" : "var(--danger)"
                    : "var(--border)",
                  color: tradeType === type
                    ? type === "long" ? "var(--accent)" : "var(--danger)"
                    : "var(--muted)",
                }}
              >
                {type === "long" ? "📈 Long" : "📉 Short"}
              </button>
            ))}
          </div>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            {tradeType === "long" ? "Profit when price goes up" : "Profit when price goes down"}
          </p>
        </div>
        
        {/* Input */}
        <div className="rounded-sm border p-8 mb-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="font-mono text-xs tracking-widest uppercase pb-4 mb-6 border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            02 — Trade Parameters
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "Entry Price", value: entryPrice, set: setEntryPrice, hint: "Price you entered the trade" },
              { label: "Exit Price", value: exitPrice, set: setExitPrice, hint: "Price you exited the trade" },
              { label: "Number of Shares", value: shares, set: setShares, hint: "Position size", noPrefix: true },
              { label: "Commission Per Side", value: commission, set: setCommission, hint: "Broker fee per order" },
            ].map(({ label, value, set, hint, noPrefix }) => (
              <div key={label} className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>{label}</label>
                <div className="relative flex items-center">
                  {!noPrefix && <span className="absolute left-4 font-mono text-sm" style={{ color: "var(--muted)" }}>$</span>}
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="w-full rounded-sm border font-mono text-sm py-3 outline-none transition-all"
                    style={{
                      background: "var(--surface2)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      paddingLeft: noPrefix ? "1rem" : "2rem",
                      paddingRight: "1rem",
                    }}
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
              background: result.isProfit
                ? "linear-gradient(135deg, rgba(0,212,170,0.06) 0%, rgba(0,212,170,0.02) 100%)"
                : "linear-gradient(135deg, rgba(255,68,68,0.06) 0%, rgba(255,68,68,0.02) 100%)",
              borderColor: result.isProfit ? "rgba(0,212,170,0.2)" : "rgba(255,68,68,0.2)",
            }}
          >
            <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: result.isProfit ? "var(--accent)" : "var(--danger)" }}>
              Net Profit / Loss
            </div>
            <div className="flex items-baseline gap-3 mb-2">
              <span
                className="font-mono font-bold"
                style={{ fontSize: "clamp(40px, 10vw, 64px)", color: result.isProfit ? "var(--accent)" : "var(--danger)", lineHeight: 1 }}
              >
                {result.isProfit ? "+" : ""}{result.netPnL < 0 ? "-" : ""}${fmt(Math.abs(result.netPnL))}
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-sm border mb-8"
              style={{
                color: result.isProfit ? "var(--accent)" : "var(--danger)",
                borderColor: result.isProfit ? "var(--accent)" : "var(--danger)",
                background: "rgba(0,0,0,0.2)",
              }}
            >
              {result.isProfit ? "▲" : "▼"} {result.netReturnPct >= 0 ? "+" : ""}{fmt(result.netReturnPct, 2)}% return
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Gross P&L", value: `${result.grossPnL >= 0 ? "+" : ""}$${fmt(Math.abs(result.grossPnL))}`, color: result.grossPnL >= 0 ? "var(--accent)" : "var(--danger)" },
                { label: "Total Commission", value: `$${fmt(result.totalCommission)}`, color: "var(--accent2)" },
                { label: "Net P&L", value: `${result.netPnL >= 0 ? "+" : "-"}$${fmt(Math.abs(result.netPnL))}`, color: result.isProfit ? "var(--accent)" : "var(--danger)" },
                { label: "Total Invested", value: `$${fmt(result.totalInvested)}`, color: "var(--text)" },
                { label: "Gross Return", value: `${result.returnPct >= 0 ? "+" : ""}${fmt(result.returnPct, 2)}%`, color: result.returnPct >= 0 ? "var(--accent)" : "var(--danger)" },
                { label: "Net Return", value: `${result.netReturnPct >= 0 ? "+" : ""}${fmt(result.netReturnPct, 2)}%`, color: result.isProfit ? "var(--accent)" : "var(--danger)" },
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-sm border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>{label}</div>
                  <div className="font-mono font-bold text-lg" style={{ color }}>{value}</div>
                </div>
              ))}
            </div>
            
            {/* Formula */}
            <div className="rounded-sm border px-5 py-4 font-mono text-xs leading-7"
                 style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--muted)" }}>
              Gross P&L = (<span style={{ color: "var(--accent)" }}>Exit − Entry</span>) × <span style={{ color: "var(--accent)" }}>Shares</span>
              <br />
              = (${fmt(parseFloat(exitPrice) || 0)} − ${fmt(parseFloat(entryPrice) || 0)}) × {shares} = <span style={{ color: result.grossPnL >= 0 ? "var(--accent)" : "var(--danger)" }}>${fmt(Math.abs(result.grossPnL))}</span>
              <br />
              Net P&L = Gross P&L − Commission = <span style={{ color: result.isProfit ? "var(--accent)" : "var(--danger)" }}>${fmt(Math.abs(result.netPnL))}</span>
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
