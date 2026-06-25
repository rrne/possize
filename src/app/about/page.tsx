import type { Metadata } from "next";
import Link from "next/link";
import ContentLayout from "../ContentLayout";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About PosSize — Free Trading Calculators",
  description:
    "PosSize builds free, accurate, no-signup trading calculators that help traders manage risk and plan every trade.",
};

export default function Page() {
  return (
    <ContentLayout title="About PosSize">
      <p>
        PosSize is a free toolkit of trading calculators built to help traders make faster, more disciplined decisions.
        Every tool runs entirely in your browser — no signup, no account, no paywall, and nothing you type ever leaves
        your device.
      </p>

      <h2>Why we built it</h2>
      <p>
        Most blown-up trading accounts share one root cause: poor risk management. Traders enter positions that are too
        large, ignore their stop distance, or misjudge leverage and margin. Good calculators fix this in seconds — but
        the ones online are often cluttered, signup-gated, or hidden behind broker funnels. We wanted clean, fast,
        accurate tools that anyone can use immediately.
      </p>

      <h2>What we offer</h2>
      <p>
        Our calculators cover the full lifecycle of a trade — sizing a position for a fixed risk, screening risk/reward,
        projecting compound growth, computing profit and loss, and handling forex pip value and margin. Each tool is
        paired with a plain-English explanation, the underlying formula, and a worked example.
      </p>

      <h2>Our principles</h2>
      <ul>
        <li>
          <strong>Free and open access.</strong> No accounts, no limits, no dark patterns.
        </li>
        <li>
          <strong>Privacy by default.</strong> Calculations happen locally; we never see your numbers.
        </li>
        <li>
          <strong>Accuracy and transparency.</strong> We show the formula behind every result.
        </li>
      </ul>

      <p>
        Ready to start? Explore the <Link href="/">full set of calculators</Link> or reach out via our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </ContentLayout>
  );
}
