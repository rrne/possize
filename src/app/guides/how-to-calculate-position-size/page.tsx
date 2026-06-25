import type { Metadata } from "next";
import GuideArticle from "../GuideArticle";

export const metadata: Metadata = {
  alternates: { canonical: "/guides/how-to-calculate-position-size" },
  title: "How to Calculate Position Size (With Formula & Examples) — PosSize",
  description:
    "Learn how to calculate position size step by step using the 1% rule, your stop-loss, and risk per trade — with worked examples for stocks and forex.",
  openGraph: {
    title: "How to Calculate Position Size — PosSize",
    description: "Learn how to calculate position size step by step using the 1% rule, your stop-loss, and risk per trade — with worked examples for stocks and forex.",
    url: "https://possize.com/guides/how-to-calculate-position-size",
    siteName: "PosSize",
    type: "article",
  },
};

export default function Page() {
  return <GuideArticle slug="how-to-calculate-position-size" />;
}
