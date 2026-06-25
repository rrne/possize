import type { Metadata } from "next";
import Calculator from "./Calculator";
import ToolPage from "../seo/ToolPage";

export const metadata: Metadata = {
  alternates: { canonical: "/compound-interest-calculator" },
  title: "Compound Interest Calculator | Free Trading Tool — PosSize",
  description:
    "Free compound interest calculator for traders. Visualize how your trading account grows over time with consistent monthly returns and compounding.",
  keywords: [
    "compound interest calculator",
    "trading account growth",
    "compound calculator",
    "investment growth calculator",
    "monthly return calculator",
  ],
  openGraph: {
    title: "Compound Interest Calculator — PosSize",
    description:
      "Visualize your trading account growth with compounding. Free trading tool.",
    url: "https://www.possize.com/compound-interest-calculator",
    siteName: "PosSize",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Calculator />
      <ToolPage slug="compound-interest-calculator" />
    </>
  );
}