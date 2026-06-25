"use client";

import AdUnit from "../AdUnit";
import Nav from "../Nav";
import { useState, useCallback } from "react";

export default function RiskRewardCalculator() {
  const [entry, setEntry] = useState("150");
  const [stopLoss, setStopLoss] = useState("145");
  const [takeProfit, setTakeProfit] = useState("165");
  const [shares, setShares] = useState("100");
  
  const calc = useCallback(() => {
    const e = parseFloat(entry) || 0;
    const sl = parseFloat(stopLoss) || 0;
    const tp = parseFloat(takeProfit) || 0;
    const s = parseFloat(shares) || 0;
    
    if (e <= 0 || sl <= 0 || tp <= 0) return null;
    
    const riskPerShare = Math.abs(e - sl);
    const rewardPerShare = Math.abs(tp - e);
    const rrRatio = riskPerShare > 0 ? rewardPerShare / riskPerShare : 0;
    const totalRisk = riskPerShare * s;
    const totalReward = rewardPerShare * s;
    const winRateNeeded = 1 / (1 + rrRatio);
    const isLong = tp > e;
    
    return { riskPerShare, rewardPerShare, rrRatio, totalRisk, totalReward, winRateNeeded, isLong };
  }, [entry, stopLoss, takeProfit, shares]);
  
  const result = calc();
  
  const fmt = (n: number, d = 2) =>
    n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  
  const getRRColor = (rr: number) => {
    if (rr >= 3) return "var(--accent)";
    if (rr >= 2) return "#90ee90";
    if (rr >= 1) return "var(--accent2)";
    return "var(--danger)";
  };
  
  const getRRLabel = (rr: number) => {
    if (rr >= 3) return "Excellent";
    if (rr >= 2) return "Good";
    if (rr >= 1) return "Acceptable";
    return "Poor";
  };
  
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Nav current="risk-reward-calculator" />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border px-3 py-1.5 rounded-sm mb-6"
            style={{ color: "var(--accent)", borderColor: "rgba(0,212,170,0.25)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            Trade Planning
          </div>
          <h1 className="font-mono font-bold mb-3" style={{ fontSize: "clamp(24px, 5vw, 36px)", letterSpacing: "-0.02em" }}>
            Risk/Reward <span style={{ color: "var(--accent)" }}>Calculator</span>
          </h1>
          <p className="font-light leading-relaxed" style={{ color: "var(--muted)" }}>
            Evaluate trade quality by calculating your risk/reward ratio before entering a position.
          </p>
        </div>
        
        <div className="rounded-sm border p-8 mb-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="font-mono text-xs tracking-widest uppercase pb-4 mb-6 border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            01 — Trade Parameters
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "Entry Price", value: entry, set: setEntry, hint: "Your planned entry price" },
              { label: "Stop Loss Price", value: stopLoss, set: setStopLoss, hint: "Your max loss exit point", danger: true },
              { label: "Take Profit Price", value: takeProfit, set: setTakeProfit, hint: "Your target exit point" },
              { label: "Number of Shares", value: shares, set: setShares, hint: "Position size (optional)", noPrefix: true },
            ].map(({ label, value, set, hint, danger, noPrefix }) => (
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
                      borderColor: danger ? "rgba(255,68,68,0.4)" : "var(--border)",
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
        
        {result && (
          <div
            className="rounded-sm border p-8 mb-4"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,170,0.06) 0%, rgba(0,212,170,0.02) 100%)",
              borderColor: "rgba(0,212,170,0.2)",
            }}
          >
            <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
              Risk / Reward Ratio
            </div>
            <div className="flex items-baseline gap-4 mb-2">
              <span className="font-mono font-bold" style={{ fontSize: "clamp(40px, 10vw, 64px)", color: getRRColor(result.rrRatio), lineHeight: 1 }}>
                1 : {fmt(result.rrRatio, 2)}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-sm border mb-8"
                 style={{ color: getRRColor(result.rrRatio), borderColor: getRRColor(result.rrRatio), background: "rgba(0,0,0,0.2)" }}>
              {getRRLabel(result.rrRatio)}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Risk per Share", value: `$${fmt(result.riskPerShare)}`, color: "var(--danger)" },
                { label: "Reward per Share", value: `$${fmt(result.rewardPerShare)}`, color: "var(--accent)" },
                { label: "Direction", value: result.isLong ? "Long 📈" : "Short 📉", color: "var(--text)" },
                { label: "Total Risk", value: `$${fmt(result.totalRisk)}`, color: "var(--danger)" },
                { label: "Total Reward", value: `$${fmt(result.totalReward)}`, color: "var(--accent)" },
                { label: "Min Win Rate", value: `${fmt(result.winRateNeeded * 100, 1)}%`, color: "var(--accent2)" },
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-sm border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>{label}</div>
                  <div className="font-mono font-bold text-lg" style={{ color }}>{value}</div>
                </div>
              ))}
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-xs mb-2" style={{ color: "var(--muted)" }}>
                <span>Risk ${fmt(result.totalRisk)}</span>
                <span>Reward ${fmt(result.totalReward)}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden flex" style={{ background: "var(--border)" }}>
                <div className="h-full transition-all duration-500"
                     style={{ width: `${(result.totalRisk / (result.totalRisk + result.totalReward)) * 100}%`, background: "var(--danger)" }} />
                <div className="h-full transition-all duration-500"
                     style={{ width: `${(result.totalReward / (result.totalRisk + result.totalReward)) * 100}%`, background: "var(--accent)" }} />
              </div>
            </div>
            
            {result.rrRatio < 1 && (
              <div className="rounded-sm border px-4 py-3 text-sm flex items-center gap-2 mb-4"
                   style={{ background: "rgba(255,68,68,0.08)", borderColor: "rgba(255,68,68,0.2)", color: "#ff8888" }}>
                ⚠ Risk/Reward below 1:1 — this trade has negative expectancy.
              </div>
            )}
            
            <div className="rounded-sm border px-5 py-4 font-mono text-xs leading-7"
                 style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--muted)" }}>
              To break even, you need to win at least{" "}
              <span style={{ color: "var(--accent)" }}>{fmt(result.winRateNeeded * 100, 1)}%</span> of trades with this setup.
              <br />
              Min Win Rate = <span style={{ color: "var(--accent)" }}>1 ÷ (1 + RR)</span> = 1 ÷ (1 + {fmt(result.rrRatio, 2)}) = <span style={{ color: "var(--accent)" }}>{fmt(result.winRateNeeded * 100, 1)}%</span>
            </div>
          </div>
        )}
        
        {/* Ad */}
        <div className="mt-8">
          <AdUnit />
        </div>

      </div>
    </main>
  );
}
