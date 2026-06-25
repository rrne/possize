import type { Metadata } from "next";
import GuideArticle from "../GuideArticle";

export const metadata: Metadata = {
  alternates: { canonical: "/guides/forex-lot-sizes-explained" },
  title: "Forex Lot Sizes Explained: Standard, Mini, Micro (+ Pip Value) — PosSize",
  description:
    "A clear breakdown of forex lot sizes — standard, mini, micro and nano — how many units each holds, and how lot size sets your pip value and risk.",
  openGraph: {
    title: "Forex Lot Sizes Explained — PosSize",
    description: "A clear breakdown of forex lot sizes — standard, mini, micro and nano — how many units each holds, and how lot size sets your pip value and risk.",
    url: "https://possize.com/guides/forex-lot-sizes-explained",
    siteName: "PosSize",
    type: "article",
  },
};

export default function Page() {
  return <GuideArticle slug="forex-lot-sizes-explained" />;
}
