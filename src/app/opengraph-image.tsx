import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "PosSize — Free Trading Calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#090e14",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* bar mark */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", marginBottom: "48px" }}>
          <div style={{ width: "40px", height: "70px", background: "#00d4aa", borderRadius: "8px" }} />
          <div style={{ width: "40px", height: "120px", background: "#00d4aa", borderRadius: "8px" }} />
          <div style={{ width: "40px", height: "170px", background: "#00d4aa", borderRadius: "8px" }} />
        </div>
        <div style={{ display: "flex", fontSize: "84px", fontWeight: 700, color: "#e8f0f7", letterSpacing: "-2px" }}>
          PosSize
        </div>
        <div style={{ display: "flex", fontSize: "40px", color: "#00d4aa", marginTop: "12px", fontWeight: 600 }}>
          Free Trading Calculators
        </div>
        <div style={{ display: "flex", fontSize: "28px", color: "#5a7a96", marginTop: "28px" }}>
          Position size · Risk/Reward · Compound · P&amp;L · Pip · Margin
        </div>
      </div>
    ),
    { ...size }
  );
}
