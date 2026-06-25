import type { Metadata } from "next";
import Calculator from "./Calculator";
import ToolPage from "../seo/ToolPage";

export const metadata: Metadata = {
  alternates: { canonical: "/breakeven-calculator" },
  title: "Break-Even Calculator | Free Trade Break-Even Price Tool — PosSize",
  description:
    "Free break-even calculator. Find the exact price your trade must reach to cover all commissions and fees before you make a profit.",
  keywords: [
    "break even calculator",
    "breakeven calculator",
    "break even price calculator",
    "trading break even",
    "stock break even calculator",
  ],
  openGraph: {
    title: "Break-Even Calculator — PosSize",
    description:
      "Calculate the break-even price of any trade including commissions and fees. Free trading tool.",
    url: "https://possize.com/breakeven-calculator",
    siteName: "PosSize",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Calculator />
      <ToolPage slug="breakeven-calculator" />
    </>
  );
}
