// Long-form guide content targeting informational long-tail keywords. Each
// guide interlinks to the relevant calculators (contextual CTAs + a related
// grid) to turn search traffic into tool usage, and carries Article + FAQ
// structured data for rich results.

export type GuideCta = { label: string; href: string };
export type GuideSection = { h: string; body: string[]; cta?: GuideCta };
export type GuideFAQ = { q: string; a: string };

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  category: string;
  readTime: string;
  updated: string;
  intro: string[];
  sections: GuideSection[];
  takeaways: string[];
  faqs: GuideFAQ[];
  related: string[]; // calculator slugs
};

export const GUIDE_ORDER = [
  "how-to-calculate-position-size",
  "what-is-a-good-risk-reward-ratio",
  "forex-lot-sizes-explained",
] as const;

export const GUIDES: Record<string, Guide> = {
  "how-to-calculate-position-size": {
    slug: "how-to-calculate-position-size",
    title: "How to Calculate Position Size: A Trader's Guide",
    metaTitle: "How to Calculate Position Size (With Formula & Examples) — PosSize",
    description:
      "Learn how to calculate position size step by step using the 1% rule, your stop-loss, and risk per trade — with worked examples for stocks and forex.",
    category: "Risk Management",
    readTime: "6 min read",
    updated: "June 26, 2026",
    intro: [
      "Position sizing is the single most important skill in trading — more important than entries, indicators, or which market you trade. It decides how much you lose when you're wrong, and since every trader is wrong often, it's what keeps your account alive long enough for your edge to play out.",
      "This guide walks through exactly how to calculate position size for any trade, the simple formula behind it, and worked examples for both stocks and forex.",
    ],
    sections: [
      {
        h: "Why position size matters more than your entry",
        body: [
          "Two traders can take the exact same trade and have completely different outcomes — not because of where they entered, but because of how much they risked. A trader who risks 1% of their account per trade can be wrong ten times in a row and still have roughly 90% of their capital. A trader who risks 10% per trade can be wiped out by a single bad streak.",
          "Position sizing converts an abstract idea — 'manage your risk' — into a precise number of shares or lots. It anchors every trade to a fixed, pre-decided loss, so no single trade can do serious damage.",
        ],
      },
      {
        h: "The position size formula",
        body: [
          "The core formula is simple: Position Size = (Account × Risk %) ÷ Risk per unit. The 'risk per unit' is the distance between your entry price and your stop-loss. In other words, you first decide how many dollars you're willing to lose, then divide by how many dollars you'll lose per share if the stop is hit.",
          "Say you have a $10,000 account and risk 1% — that's $100 at risk. If your entry is $50 and your stop-loss is $48, you lose $2 per share. So your position size is $100 ÷ $2 = 50 shares. If the stop is hit, you lose exactly $100, your planned 1%.",
        ],
        cta: { label: "Try the Position Size Calculator", href: "/position-size-calculator" },
      },
      {
        h: "The 1% (and 2%) rule",
        body: [
          "Most professional traders risk between 0.5% and 2% of their account on any single trade. The '1% rule' is the most common starting point: never risk more than 1% of your capital on one position. This isn't about being timid — it's about survival math. At 1% risk, even a brutal 20-trade losing streak only draws your account down by roughly 18%, which is fully recoverable.",
          "At 2% risk, the same streak costs you about 33%. Above 2% the math turns hostile fast: large drawdowns require exponentially larger gains just to break even, so disciplined sizing is what separates traders who last from those who don't.",
        ],
      },
      {
        h: "Position sizing in forex",
        body: [
          "Forex works the same way, but position size is measured in lots and your stop is measured in pips. The formula becomes: Lots = (Account × Risk %) ÷ (Stop in pips × Pip value). A standard lot is 100,000 units, a mini lot 10,000, and a micro lot 1,000.",
          "For example, on a $10,000 account risking 1% ($100) with a 25-pip stop and a pip value of $10 per standard lot: Lots = $100 ÷ (25 × $10) = 0.40 lots. The principle is identical to stocks — fix the dollar risk first, then size the position to fit it.",
        ],
        cta: { label: "Try the Lot Size Calculator", href: "/lot-size-calculator" },
      },
    ],
    takeaways: [
      "Decide your dollar risk first (account × risk %), then size the position to fit it.",
      "Position Size = Risk amount ÷ (distance from entry to stop-loss).",
      "Risk 1–2% per trade so a losing streak can't end your account.",
      "Forex uses the same logic, expressed in lots and pips.",
    ],
    faqs: [
      { q: "What percentage should I risk per trade?", a: "Most professionals risk 1–2% of their account per trade. Beginners are often best served by 0.5–1% while they build consistency, because smaller risk makes a losing streak far easier to recover from." },
      { q: "Does position sizing work for crypto and futures?", a: "Yes. The formula — risk amount divided by the distance to your stop — works in any market. Only the unit changes (shares, contracts, coins, or lots)." },
      { q: "Should position size change with conviction?", a: "Some traders scale risk slightly with setup quality, but the safest approach is a fixed percentage. Increasing size on 'high-conviction' trades is how disciplined accounts blow up, because conviction and outcome are weakly correlated." },
    ],
    related: ["position-size-calculator", "lot-size-calculator", "risk-reward-calculator"],
  },

  "what-is-a-good-risk-reward-ratio": {
    slug: "what-is-a-good-risk-reward-ratio",
    title: "What Is a Good Risk/Reward Ratio?",
    metaTitle: "What Is a Good Risk/Reward Ratio? (With Win-Rate Math) — PosSize",
    description:
      "Understand risk/reward ratios, what counts as 'good', and how R:R and win rate combine to decide whether a strategy is actually profitable.",
    category: "Trade Planning",
    readTime: "5 min read",
    updated: "June 26, 2026",
    intro: [
      "Risk/reward ratio is one of the most quoted — and most misunderstood — numbers in trading. A '1:3' setup sounds great, but on its own it tells you almost nothing about whether you'll make money. What matters is how risk/reward combines with your win rate.",
      "This guide explains what risk/reward ratio actually measures, what counts as a good one, and the simple math that ties it to profitability.",
    ],
    sections: [
      {
        h: "What risk/reward ratio means",
        body: [
          "Risk/reward ratio compares how much you stand to lose if your stop is hit to how much you stand to gain if your target is reached. If you risk $100 to make $300, your risk/reward is 1:3. The first number is always your risk (1 unit); the second is your potential reward in the same units.",
          "It's measured from your entry to your stop (the risk) and from your entry to your target (the reward) — so it's defined entirely by where you place those two levels, before the trade even starts.",
        ],
        cta: { label: "Try the Risk/Reward Calculator", href: "/risk-reward-calculator" },
      },
      {
        h: "Why R:R is meaningless without win rate",
        body: [
          "Here's the part most beginners miss: a high risk/reward ratio does not mean a strategy is profitable. A 1:5 setup that only wins 10% of the time loses money. A 1:1 setup that wins 60% of the time makes money. The two numbers are inseparable.",
          "The break-even win rate for any ratio is: Win% = 1 ÷ (1 + reward/risk). So a 1:2 setup breaks even at 33% wins, a 1:3 at 25%, and a 1:1 at 50%. To be profitable, your actual win rate just needs to beat that threshold.",
        ],
      },
      {
        h: "So what's a 'good' ratio?",
        body: [
          "For most discretionary traders, a minimum of 1:1.5 to 1:2 is a sensible floor — it means you don't need to win most of your trades to come out ahead. Trend-following and breakout strategies often target 1:3 or higher, accepting lower win rates in exchange for big winners.",
          "Mean-reversion and scalping strategies frequently use ratios below 1:1 but win far more often. Neither is 'better' in the abstract — a good ratio is simply one your realistic win rate can support with margin to spare after costs.",
        ],
      },
      {
        h: "Don't forget costs and slippage",
        body: [
          "Commissions, spreads, and slippage quietly erode your real risk/reward. A setup that looks like 1:2 on paper might be 1:1.6 after costs, which raises the win rate you need. Always plan trades using net numbers, and re-check your break-even after fees before committing.",
        ],
        cta: { label: "Check your break-even price", href: "/breakeven-calculator" },
      },
    ],
    takeaways: [
      "Risk/reward compares potential loss (1 unit) to potential gain.",
      "A high ratio alone doesn't make a strategy profitable — win rate decides.",
      "Break-even win rate = 1 ÷ (1 + reward/risk).",
      "1:1.5–1:2 is a sensible minimum for most discretionary traders.",
      "Always evaluate the ratio using net numbers, after costs.",
    ],
    faqs: [
      { q: "Is a higher risk/reward ratio always better?", a: "No. Higher ratios usually come with lower win rates. A 1:5 setup that rarely hits its target can lose money, while a 1:1 setup with a high win rate can be very profitable. The ratio is only useful alongside your realistic win rate." },
      { q: "What win rate do I need for a 1:2 ratio?", a: "About 34%. The break-even win rate for 1:2 is 1 ÷ (1 + 2) = 33.3%, so anything consistently above that — after costs — is profitable." },
      { q: "How do I improve my risk/reward?", a: "Tighten entries so your stop can sit closer, place targets at realistic levels supported by structure, and avoid widening stops mid-trade. Improving R:R only helps if your win rate doesn't collapse as a result." },
    ],
    related: ["risk-reward-calculator", "position-size-calculator", "profit-loss-calculator"],
  },

  "forex-lot-sizes-explained": {
    slug: "forex-lot-sizes-explained",
    title: "Forex Lot Sizes Explained: Standard, Mini & Micro",
    metaTitle: "Forex Lot Sizes Explained: Standard, Mini, Micro (+ Pip Value) — PosSize",
    description:
      "A clear breakdown of forex lot sizes — standard, mini, micro and nano — how many units each holds, and how lot size sets your pip value and risk.",
    category: "Forex",
    readTime: "5 min read",
    updated: "June 26, 2026",
    intro: [
      "If you're new to forex, 'lots' can be confusing. Unlike stocks, where you buy a number of shares, forex is traded in standardised blocks of currency called lots. Understanding lot sizes is essential because they directly determine how much each pip move is worth — and therefore how much you risk.",
      "This guide breaks down the four lot sizes, shows how they map to units and pip value, and explains how to choose the right one.",
    ],
    sections: [
      {
        h: "The four lot sizes",
        body: [
          "There are four standard lot sizes in forex. A standard lot is 100,000 units of the base currency. A mini lot is 10,000 units (0.1 lots). A micro lot is 1,000 units (0.01 lots). A nano lot is 100 units (0.001 lots), offered by only some brokers.",
          "The lot size you trade is just a multiplier on your exposure: trading 0.5 standard lots means 50,000 units. Most retail traders work in mini and micro lots, which give precise control over position size without requiring a huge account.",
        ],
      },
      {
        h: "How lot size sets your pip value",
        body: [
          "Lot size matters because it fixes the value of a single pip. For a USD-quoted pair like EUR/USD, one pip is worth roughly $10 per standard lot, $1 per mini lot, and $0.10 per micro lot. That linear relationship is the whole point: bigger lots mean each pip move moves your account more.",
          "So a 20-pip move is worth about $200 on a standard lot but only $20 on a mini lot. Choosing your lot size is really choosing how much each pip is worth to you.",
        ],
        cta: { label: "Calculate exact pip value", href: "/pip-calculator" },
      },
      {
        h: "Choosing the right lot size",
        body: [
          "Don't pick a lot size by feel — derive it from your risk. Decide the dollar amount you're willing to lose (typically 1–2% of your account), measure your stop-loss in pips, and work backwards to the lot size that makes those two numbers agree.",
          "For example, risking $100 with a 25-pip stop and $10 pip value gives 0.40 lots. This is exactly what a lot size calculator does — it removes the guesswork so your risk stays constant no matter the pair or stop distance.",
        ],
        cta: { label: "Try the Lot Size Calculator", href: "/lot-size-calculator" },
      },
      {
        h: "Lots, leverage and margin",
        body: [
          "Lot size and leverage are related but separate. Lot size sets your exposure (and pip value); leverage sets how much margin that exposure ties up. A larger lot needs more margin, and over-sizing relative to your account is the fastest route to a margin call. Always check the required margin before opening a large position.",
        ],
        cta: { label: "Check required margin", href: "/margin-calculator" },
      },
    ],
    takeaways: [
      "Standard = 100,000 units, Mini = 10,000, Micro = 1,000, Nano = 100.",
      "Pip value scales with lot size: ~$10 / $1 / $0.10 per pip for USD pairs.",
      "Choose lot size from your risk and stop distance, not by feel.",
      "Larger lots need more margin — verify it before you trade.",
    ],
    faqs: [
      { q: "How many units is a standard lot?", a: "A standard lot is 100,000 units of the base currency. A mini lot is 10,000 units, a micro lot is 1,000 units, and a nano lot (where offered) is 100 units." },
      { q: "How much is a pip worth per lot?", a: "For pairs quoted in USD, a pip is worth about $10 per standard lot, $1 per mini lot, and $0.10 per micro lot. For other pairs it varies with the exchange rate." },
      { q: "What lot size should a beginner use?", a: "Micro lots (1,000 units) are ideal for beginners. They keep pip value small (about $0.10), so you can trade real money and learn position sizing without risking large amounts per pip." },
    ],
    related: ["lot-size-calculator", "pip-calculator", "margin-calculator"],
  },
};
