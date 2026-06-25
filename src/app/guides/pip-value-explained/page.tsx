import type { Metadata } from "next";
import GuideArticle from "../GuideArticle";

export const metadata: Metadata = {
  alternates: { canonical: "/guides/pip-value-explained" },
  title: "Pip Value Explained: How Much Is a Pip Worth? — PosSize",
  description:
    "What a pip is, how to calculate pip value for any pair and lot size, and why JPY pairs and account currency change the number.",
  openGraph: {
    title: "Pip Value Explained — PosSize",
    description: "What a pip is, how to calculate pip value for any pair and lot size, and why JPY pairs and account currency change the number.",
    url: "https://possize.com/guides/pip-value-explained",
    siteName: "PosSize",
    type: "article",
  },
};

export default function Page() {
  return <GuideArticle slug="pip-value-explained" />;
}
