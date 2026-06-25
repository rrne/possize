import type { Metadata } from "next";
import GuideArticle from "../GuideArticle";

export const metadata: Metadata = {
  alternates: { canonical: "/guides/what-is-a-good-risk-reward-ratio" },
  title: "What Is a Good Risk/Reward Ratio? (With Win-Rate Math) — PosSize",
  description:
    "Understand risk/reward ratios, what counts as 'good', and how R:R and win rate combine to decide whether a strategy is actually profitable.",
  openGraph: {
    title: "What Is a Good Risk/Reward Ratio? — PosSize",
    description: "Understand risk/reward ratios, what counts as 'good', and how R:R and win rate combine to decide whether a strategy is actually profitable.",
    url: "https://possize.com/guides/what-is-a-good-risk-reward-ratio",
    siteName: "PosSize",
    type: "article",
  },
};

export default function Page() {
  return <GuideArticle slug="what-is-a-good-risk-reward-ratio" />;
}
