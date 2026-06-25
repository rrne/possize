"use client";

// Theme is driven entirely by the `data-theme` attribute on <html>, which the
// inline script in layout.tsx sets before paint. This button just flips it and
// persists the choice — no React state, so there is no hydration mismatch or flash.
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    // localStorage unavailable (private mode) — ignore
  }
}

export default function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark / light theme"
      title="Toggle theme"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-11 h-11 rounded-full border shadow-lg transition-all duration-200 hover:scale-105"
      style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--accent)" }}
    >
      {/* Sun — shown in dark mode (click to go light). Hidden in light mode via CSS. */}
      <svg className="theme-icon-sun w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="4" strokeWidth={1.8} />
        <path strokeWidth={1.8} strokeLinecap="round" d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* Moon — shown in light mode (click to go dark). Hidden in dark mode via CSS. */}
      <svg className="theme-icon-moon w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
      </svg>
    </button>
  );
}
