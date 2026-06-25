"use client";

import AdUnit from "../AdUnit";
import Nav from "../Nav";
import ShareBar from "../ShareBar";
import { useDeepLink } from "../useDeepLink";
import { useState, useCallback } from "react";

export default function PositionSizeCalculator() {
  const [balance, setBalance] = useState("10000");
  const [riskPct, setRiskPct] = useState("2");
  const [entry, setEntry] = useState("150");
  const [stopLoss, setStopLoss] = useState("145");
  const [takeProfit, setTakeProfit] = useState("165");
  const [commission, setCommission] = useState("0");
  
  useDeepLink(
    { balance, riskPct, entry, stopLoss, takeProfit, commission },
    { balance: setBalance, riskPct: setRiskPct, entry: setEntry, stopLoss: setStopLoss, takeProfit: setTakeProfit, commission: setCommission },
  );

  const calc = useCallback(() => {
    const b = parseFloat(balance) || 0;
    const r = parseFloat(riskPct) || 0;
    const e = parseFloat(entry) || 0;
    const sl = parseFloat(stopLoss) || 0;
    const tp = parseFloat(takeProfit) || 0;
    const c = parseFloat(commission) || 0;
    
    const maxRisk = b * (r / 100);
    const riskPerShare = Math.abs(e - sl);
    
    if (riskPerShare <= 0 || e <= 0 || b <= 0) {
      return null;
    }
    
    const shares = Math.max(0, Math.floor((maxRisk - c * 2) / riskPerShare));
    const tradeValue = shares * e;
    const accountPct = (tradeValue / b) * 100;
    const actualRisk = shares * riskPerShare;
    const potProfit = tp > 0 ? shares * Math.abs(tp - e) : null;
    const rrRatio = potProfit && actualRisk > 0 ? potProfit / actualRisk : null;
    
    return { shares, maxRisk, tradeValue, accountPct, riskPerShare, actualRisk, potProfit, rrRatio };
  }, [balance, riskPct, entry, stopLoss, takeProfit, commission]);
  
  const result = calc();
  
  const fmt = (n: number, d = 0) =>
    n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  
  const isHighRisk = parseFloat(riskPct) > 3;
  
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Nav current="position-size-calculator" />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border px-3 py-1.5 rounded-sm mb-6"
            style={{ color: "var(--accent)", borderColor: "rgba(0,212,170,0.45)", background: "rgba(0,212,170,0.12)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            Risk Management
          </div>
          <h1 className="font-mono font-bold mb-3" style={{ fontSize: "clamp(24px, 5vw, 36px)", letterSpacing: "-0.02em" }}>
            Position Size <span style={{ color: "var(--accent)" }}>Calculator</span>
          </h1>
          <p className="font-light leading-relaxed" style={{ color: "var(--muted)" }}>
            Calculate the optimal number of shares based on your account size and risk tolerance.
          </p>
        </div>
        
        {/* Input: Account */}
        <div className="rounded-sm border p-8 mb-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="font-mono text-xs tracking-widest uppercase pb-4 mb-6 border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            01 — Account Settings
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
                value={Math.min(parseFloat(riskPct) || 2, 10)}
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
            02 — Trade Parameters
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "Entry Price", value: entry, set: setEntry, hint: "Price you plan to buy" },
              { label: "Stop Loss Price", value: stopLoss, set: setStopLoss, hint: "Your max loss exit point", danger: true },
              { label: "Take Profit Price", value: takeProfit, set: setTakeProfit, hint: "Your target exit point (optional)" },
              { label: "Commission Per Side", value: commission, set: setCommission, hint: "Broker fee per order" },
            ].map(({ label, value, set, hint, danger }) => (
              <div key={label} className="flex flex-col gap-2">
                <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>{label}</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 font-mono text-sm" style={{ color: "var(--muted)" }}>$</span>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="w-full rounded-sm border font-mono text-sm py-3 pl-8 pr-4 outline-none transition-all"
                    style={{
                      background: "var(--surface2)",
                      borderColor: danger ? "rgba(255,68,68,0.4)" : "var(--border)",
                      color: "var(--text)",
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
              background: "linear-gradient(135deg, rgba(0,212,170,0.06) 0%, rgba(0,212,170,0.02) 100%)",
              borderColor: "rgba(0,212,170,0.2)",
            }}
          >
            <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
              Recommended Position Size
            </div>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-mono font-bold" style={{ fontSize: "clamp(40px, 10vw, 64px)", color: "var(--accent)", lineHeight: 1 }}>
                {fmt(result.shares)}
              </span>
              <span className="font-mono text-xl" style={{ color: "var(--muted)" }}>shares</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Max Risk ($)", value: `$${fmt(result.maxRisk, 2)}`, color: "var(--danger)" },
                { label: "Trade Value", value: `$${fmt(result.tradeValue)}`, color: "var(--text)" },
                { label: "% of Account", value: `${fmt(result.accountPct, 1)}%`, color: "var(--accent2)" },
                { label: "Risk per Share", value: `$${fmt(result.riskPerShare, 2)}`, color: "var(--text)" },
                { label: "Potential Profit", value: result.potProfit ? `$${fmt(result.potProfit)}` : "—", color: "var(--accent)" },
                { label: "Risk/Reward", value: result.rrRatio ? `1 : ${fmt(result.rrRatio, 1)}` : "—", color: "var(--text)" },
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-sm border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>{label}</div>
                  <div className="font-mono font-bold text-lg" style={{ color }}>{value}</div>
                </div>
              ))}
            </div>
            
            {/* RR Bar */}
            {result.rrRatio && result.potProfit && (
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-2" style={{ color: "var(--muted)" }}>
                  <span>Loss ${fmt(result.actualRisk)}</span>
                  <span>Gain ${fmt(result.potProfit)}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div className="flex h-full">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(result.actualRisk / (result.actualRisk + result.potProfit)) * 100}%`,
                        background: "var(--danger)",
                      }}
                    />
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(result.potProfit / (result.actualRisk + result.potProfit)) * 100}%`,
                        background: "var(--accent)",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Warning */}
            {isHighRisk && (
              <div className="rounded-sm border px-4 py-3 text-sm mb-6 flex items-center gap-2" style={{ background: "rgba(255,68,68,0.08)", borderColor: "rgba(255,68,68,0.2)", color: "#ff8888" }}>
                ⚠ Risk exceeds 3% — consider reducing your position size.
              </div>
            )}
            
            {/* Formula */}
            <div className="rounded-sm border px-5 py-4 font-mono text-xs leading-7" style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--muted)" }}>
              Position Size = <span style={{ color: "var(--accent)" }}>Max Risk ($)</span> ÷ <span style={{ color: "var(--accent)" }}>Risk per Share</span>
              <br />= <span style={{ color: "var(--accent)" }}>${fmt(result.maxRisk, 2)}</span> ÷ <span style={{ color: "var(--accent)" }}>${fmt(result.riskPerShare, 2)}</span> = <span style={{ color: "var(--accent)" }}>{fmt(result.shares)} shares</span>
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
