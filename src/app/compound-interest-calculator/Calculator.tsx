"use client";

import Link from "next/link";
import AdUnit from "../AdUnit";
import { useState, useCallback } from "react";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [monthlyReturn, setMonthlyReturn] = useState("5");
  const [months, setMonths] = useState("12");
  const [monthlyContribution, setMonthlyContribution] = useState("0");
  
  const calc = useCallback(() => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(monthlyReturn) || 0) / 100;
    const m = Math.min(Math.floor(parseFloat(months) || 0), 120);
    const c = parseFloat(monthlyContribution) || 0;
    
    if (p <= 0 || r <= 0 || m <= 0) return null;
    
    const data: { month: number; balance: number; contributions: number; gains: number }[] = [];
    let balance = p;
    
    for (let i = 1; i <= m; i++) {
      balance = balance * (1 + r) + c;
      const contributions = p + c * i;
      const gains = balance - contributions;
      data.push({ month: i, balance, contributions, gains });
    }
    
    const finalBalance = data[data.length - 1].balance;
    const totalContributions = p + c * m;
    const totalGains = finalBalance - totalContributions;
    const totalReturn = ((finalBalance - p) / p) * 100;
    
    return { data, finalBalance, totalContributions, totalGains, totalReturn };
  }, [principal, monthlyReturn, months, monthlyContribution]);
  
  const result = calc();
  
  const fmt = (n: number, d = 0) =>
    n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  
  const maxBalance = result ? Math.max(...result.data.map((d) => d.balance)) : 0;
  
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
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
            Growth · Long-term
          </div>
          <h1 className="font-mono font-bold mb-3" style={{ fontSize: "clamp(24px, 5vw, 36px)", letterSpacing: "-0.02em" }}>
            Compound Interest <span style={{ color: "var(--accent)" }}>Calculator</span>
          </h1>
          <p className="font-light leading-relaxed" style={{ color: "var(--muted)" }}>
            Visualize how your trading account grows over time with consistent monthly returns.
          </p>
        </div>
        
        {/* Input */}
        <div className="rounded-sm border p-8 mb-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="font-mono text-xs tracking-widest uppercase pb-4 mb-6 border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            01 — Parameters
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>Starting Balance</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 font-mono text-sm" style={{ color: "var(--muted)" }}>$</span>
                <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)}
                       className="w-full rounded-sm border font-mono text-sm py-3 pl-8 pr-4 outline-none"
                       style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }} />
              </div>
              <span className="text-xs" style={{ color: "var(--muted)" }}>Initial account balance</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                Monthly Return — <span className="font-mono" style={{ color: "var(--accent)" }}>{monthlyReturn}%</span>
              </label>
              <div className="relative flex items-center">
                <input type="number" value={monthlyReturn} onChange={(e) => setMonthlyReturn(e.target.value)}
                       className="w-full rounded-sm border font-mono text-sm py-3 pl-4 pr-8 outline-none"
                       style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }} />
                <span className="absolute right-4 font-mono text-sm" style={{ color: "var(--muted)" }}>%</span>
              </div>
              <input type="range" min="0.1" max="30" step="0.1" value={Math.min(parseFloat(monthlyReturn) || 5, 30)}
                     onChange={(e) => setMonthlyReturn(e.target.value)}
                     className="w-full mt-1 cursor-pointer" style={{ accentColor: "var(--accent)" }} />
              <span className="text-xs" style={{ color: "var(--muted)" }}>Average monthly % gain</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                Duration — <span className="font-mono" style={{ color: "var(--accent)" }}>{months} months</span>
              </label>
              <div className="relative flex items-center">
                <input type="number" value={months} onChange={(e) => setMonths(e.target.value)}
                       className="w-full rounded-sm border font-mono text-sm py-3 pl-4 pr-16 outline-none"
                       style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }} />
                <span className="absolute right-4 font-mono text-sm" style={{ color: "var(--muted)" }}>mo</span>
              </div>
              <input type="range" min="1" max="120" step="1" value={Math.min(parseFloat(months) || 12, 120)}
                     onChange={(e) => setMonths(e.target.value)}
                     className="w-full mt-1 cursor-pointer" style={{ accentColor: "var(--accent)" }} />
              <span className="text-xs" style={{ color: "var(--muted)" }}>Max 120 months (10 years)</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>Monthly Contribution</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 font-mono text-sm" style={{ color: "var(--muted)" }}>$</span>
                <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)}
                       className="w-full rounded-sm border font-mono text-sm py-3 pl-8 pr-4 outline-none"
                       style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }} />
              </div>
              <span className="text-xs" style={{ color: "var(--muted)" }}>Additional monthly deposit (optional)</span>
            </div>
          </div>
        </div>
        
        {/* Result */}
        {result && (
          <>
            <div
              className="rounded-sm border p-8 mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,170,0.06) 0%, rgba(0,212,170,0.02) 100%)",
                borderColor: "rgba(0,212,170,0.2)",
              }}
            >
              <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
                Final Balance
              </div>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-mono font-bold" style={{ fontSize: "clamp(36px, 8vw, 56px)", color: "var(--accent)", lineHeight: 1 }}>
                  ${fmt(result.finalBalance)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { label: "Total Invested", value: `$${fmt(result.totalContributions)}`, color: "var(--muted)" },
                  { label: "Total Gains", value: `$${fmt(result.totalGains)}`, color: "var(--accent)" },
                  { label: "Total Return", value: `${fmt(result.totalReturn, 1)}%`, color: "var(--accent2)" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="rounded-sm border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                    <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>{label}</div>
                    <div className="font-mono font-bold text-lg" style={{ color }}>{value}</div>
                  </div>
                ))}
              </div>
              
              {/* Bar Chart */}
              <div className="rounded-sm border p-5" style={{ background: "var(--surface2)", borderColor: "var(--border)" }}>
                <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)" }}>
                  Monthly Growth
                </div>
                <div className="flex items-end gap-0.5 h-32">
                  {result.data.map((d, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm transition-all duration-300 cursor-pointer group relative"
                      style={{
                        height: `${(d.balance / maxBalance) * 100}%`,
                        background: `linear-gradient(180deg, var(--accent) 0%, rgba(0,212,170,0.3) 100%)`,
                        minWidth: "2px",
                      }}
                      title={`Month ${d.month}: $${fmt(d.balance)}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between font-mono text-xs mt-2" style={{ color: "var(--muted)" }}>
                  <span>Month 1</span>
                  <span>Month {result.data.length}</span>
                </div>
              </div>
            </div>
            
            {/* Monthly Breakdown Table */}
            <div className="rounded-sm border mb-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="font-mono text-xs tracking-widest uppercase px-6 py-4 border-b" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
                Monthly Breakdown
              </div>
              <div className="overflow-auto max-h-64">
                <table className="w-full text-sm">
                  <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                    {["Month", "Balance", "Invested", "Gains"].map((h) => (
                      <th key={h} className="font-mono text-xs uppercase tracking-wider text-left px-6 py-3" style={{ color: "var(--muted)" }}>{h}</th>
                    ))}
                  </tr>
                  </thead>
                  <tbody>
                  {result.data.map((d, i) => (
                    <tr key={i} className="border-b transition-colors" style={{ borderColor: "var(--border)" }}>
                      <td className="font-mono px-6 py-3 text-xs" style={{ color: "var(--muted)" }}>{d.month}</td>
                      <td className="font-mono px-6 py-3 font-bold" style={{ color: "var(--accent)" }}>${fmt(d.balance)}</td>
                      <td className="font-mono px-6 py-3" style={{ color: "var(--text)" }}>${fmt(d.contributions)}</td>
                      <td className="font-mono px-6 py-3" style={{ color: d.gains >= 0 ? "var(--accent)" : "var(--danger)" }}>
                        ${fmt(d.gains)}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        
        {/* Ad */}
        <div className="mt-8">
          <AdUnit />
        </div>

      </div>
    </main>
  );
}
