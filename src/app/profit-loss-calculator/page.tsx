import type { Metadata } from "next";
import Calculator from "./Calculator";
import ToolPage from "../seo/ToolPage";

export const metadata: Metadata = {
  alternates: { canonical: "/profit-loss-calculator" },
  title: "Profit Loss Calculator | Free Trading Tool — PosSize",
  description:
    "Free profit and loss calculator for traders. Calculate your exact profit or loss on any trade including commissions and fees for both long and short positions.",
  keywords: [
    "profit loss calculator",
    "trading pnl calculator",
    "stock profit calculator",
    "trade profit calculator",
    "trading calculator",
  ],
  openGraph: {
    title: "Profit Loss Calculator — PosSize",
    description:
      "Calculate exact profit or loss on any trade including fees. Free trading tool.",
    url: "https://possize.com/profit-loss-calculator",
    siteName: "PosSize",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Calculator />
      <ToolPage slug="profit-loss-calculator" />
    </>
  );
}