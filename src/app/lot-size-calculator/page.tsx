import type { Metadata } from "next";
import Calculator from "./Calculator";
import ToolPage from "../seo/ToolPage";

export const metadata: Metadata = {
  alternates: { canonical: "/lot-size-calculator" },
  title: "Lot Size Calculator | Free Forex Position Sizing Tool — PosSize",
  description:
    "Free forex lot size calculator. Find the exact number of standard, mini or micro lots to trade for a fixed risk based on your stop-loss in pips.",
  keywords: [
    "lot size calculator",
    "forex lot size calculator",
    "position size forex",
    "standard lot calculator",
    "forex risk calculator",
  ],
  openGraph: {
    title: "Lot Size Calculator — PosSize",
    description:
      "Calculate the exact forex lot size for a fixed risk based on your stop-loss in pips. Free trading tool.",
    url: "https://possize.com/lot-size-calculator",
    siteName: "PosSize",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Calculator />
      <ToolPage slug="lot-size-calculator" />
    </>
  );
}
