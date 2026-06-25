import type { Metadata } from "next";
import Calculator from "./Calculator";
import ToolPage from "../seo/ToolPage";

export const metadata: Metadata = {
  alternates: { canonical: "/position-size-calculator" },
  title: "Position Size Calculator | Free Trading Tool — PosSize",
  description:
    "Free position size calculator for traders. Calculate the optimal number of shares based on your account balance, risk percentage, entry price and stop loss.",
  keywords: [
    "position size calculator",
    "trading position size",
    "risk management calculator",
    "stock position calculator",
    "forex position size",
  ],
  openGraph: {
    title: "Position Size Calculator — PosSize",
    description:
      "Calculate the optimal position size based on your account size and risk tolerance. Free trading tool.",
    url: "https://possize.com/position-size-calculator",
    siteName: "PosSize",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Calculator />
      <ToolPage slug="position-size-calculator" />
    </>
  );
}