import type { Metadata } from "next";
import GuideArticle from "../GuideArticle";

export const metadata: Metadata = {
  alternates: { canonical: "/guides/how-to-calculate-profit-and-loss" },
  title: "How to Calculate Profit and Loss on a Trade (Formula) — PosSize",
  description:
    "Learn how to calculate profit and loss on long and short trades, including commissions and fees, with a simple formula and worked examples.",
  openGraph: {
    title: "How to Calculate Profit and Loss — PosSize",
    description: "Learn how to calculate profit and loss on long and short trades, including commissions and fees, with a simple formula and worked examples.",
    url: "https://possize.com/guides/how-to-calculate-profit-and-loss",
    siteName: "PosSize",
    type: "article",
  },
};

export default function Page() {
  return <GuideArticle slug="how-to-calculate-profit-and-loss" />;
}
