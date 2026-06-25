import type { Metadata } from "next";
import ContentLayout from "../ContentLayout";

export const metadata: Metadata = {
  alternates: { canonical: "/disclaimer" },
  title: "Risk Disclaimer — PosSize",
  description:
    "Trading involves substantial risk. PosSize calculators are educational tools, not financial advice.",
};

export default function Page() {
  return (
    <ContentLayout title="Risk Disclaimer" updated="June 26, 2026">
      <p>
        The information and calculators provided by PosSize are for <strong>general educational purposes only</strong>{" "}
        and do not constitute financial, investment, or trading advice.
      </p>

      <h2>Trading carries risk</h2>
      <p>
        Trading stocks, forex, futures, options, CFDs, and other leveraged instruments carries a high level of risk and
        may not be suitable for all investors. You can lose some or all of your invested capital; therefore, you should
        not invest money that you cannot afford to lose. Leverage can work against you as well as for you.
      </p>

      <h2>No guarantee of accuracy</h2>
      <p>
        Our calculators use standard formulas and the figures you provide. Results are estimates and may not reflect
        real-world fees, slippage, spreads, swaps, or broker-specific conditions. Always confirm position sizes, margins,
        and risk figures with your broker before placing a trade.
      </p>

      <h2>Not a recommendation</h2>
      <p>
        Nothing on PosSize should be interpreted as a recommendation to enter into any particular trade or strategy.
        Past performance and hypothetical results are not indicative of future results.
      </p>

      <h2>Seek professional advice</h2>
      <p>
        Before making any financial decision, consider seeking advice from an independent, licensed financial advisor
        who understands your individual circumstances.
      </p>

      <p>
        By using PosSize you acknowledge that you are solely responsible for your own trading and investment decisions.
      </p>
    </ContentLayout>
  );
}
