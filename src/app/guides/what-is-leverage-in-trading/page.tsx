import type { Metadata } from "next";
import GuideArticle from "../GuideArticle";

export const metadata: Metadata = {
  alternates: { canonical: "/guides/what-is-leverage-in-trading" },
  title: "What Is Leverage in Trading? Margin & Risk Explained — PosSize",
  description:
    "Understand what leverage means in trading, how it relates to margin, and why high leverage magnifies losses as much as gains — with clear worked examples.",
  openGraph: {
    title: "What Is Leverage in Trading? — PosSize",
    description: "Understand what leverage means in trading, how it relates to margin, and why high leverage magnifies losses as much as gains — with clear worked examples.",
    url: "https://possize.com/guides/what-is-leverage-in-trading",
    siteName: "PosSize",
    type: "article",
  },
};

export default function Page() {
  return <GuideArticle slug="what-is-leverage-in-trading" />;
}
