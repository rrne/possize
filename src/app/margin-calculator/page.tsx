import type { Metadata } from "next";
import Calculator from "./Calculator";
import ToolPage from "../seo/ToolPage";

export const metadata: Metadata = {
  alternates: { canonical: "/margin-calculator" },
  title: "Margin Calculator | Free Leverage & Required Margin Tool — PosSize",
  description:
    "Free margin calculator for leveraged trading. Calculate the required margin and notional value for any position size, entry price and leverage.",
  keywords: [
    "margin calculator",
    "required margin",
    "leverage calculator",
    "forex margin calculator",
    "notional value calculator",
  ],
  openGraph: {
    title: "Margin Calculator — PosSize",
    description:
      "Calculate the required margin and notional value for any leveraged position. Free trading tool.",
    url: "https://possize.com/margin-calculator",
    siteName: "PosSize",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Calculator />
      <ToolPage slug="margin-calculator" />
    </>
  );
}
