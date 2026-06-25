import type { Metadata } from "next";
import Calculator from "./Calculator";
import ToolPage from "../seo/ToolPage";

export const metadata: Metadata = {
  alternates: { canonical: "/pip-calculator" },
  title: "Pip Calculator | Free Forex Pip Value Tool — PosSize",
  description:
    "Free forex pip calculator. Instantly calculate the pip value of any currency pair in your account currency based on lot size and exchange rate.",
  keywords: [
    "pip calculator",
    "forex pip value",
    "pip value calculator",
    "lot size pip value",
    "forex position calculator",
  ],
  openGraph: {
    title: "Pip Calculator — PosSize",
    description:
      "Calculate the monetary value of a pip for any currency pair and lot size. Free forex trading tool.",
    url: "https://possize.com/pip-calculator",
    siteName: "PosSize",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Calculator />
      <ToolPage slug="pip-calculator" />
    </>
  );
}
