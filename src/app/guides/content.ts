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
  "what-is-leverage-in-trading",
  "how-to-calculate-profit-and-loss",
  "pip-value-explained",
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

  "what-is-leverage-in-trading": {
    slug: "what-is-leverage-in-trading",
    title: "What Is Leverage in Trading? Margin, Risk & Examples",
    metaTitle: "What Is Leverage in Trading? Margin & Risk Explained — PosSize",
    description:
      "Understand what leverage means in trading, how it relates to margin, and why high leverage magnifies losses as much as gains — with clear worked examples.",
    category: "Leverage",
    readTime: "6 min read",
    updated: "June 26, 2026",
    intro: [
      "Leverage lets you control a large position with a relatively small amount of your own capital. A broker offering 30:1 leverage means $1,000 of your money can control a $30,000 position. It's the engine behind forex and CFD trading — and the single most common reason new accounts blow up.",
      "This guide explains what leverage actually is, how it connects to margin, and how to use it without handing your account to the market.",
    ],
    sections: [
      {
        h: "Leverage and margin are two sides of one coin",
        body: [
          "Leverage is the ratio between your position size and the capital required to open it. Margin is that required capital expressed as money. They're linked by a simple relationship: margin percentage = 100 ÷ leverage. So 30:1 leverage needs about 3.33% margin, 100:1 needs 1%, and 10:1 needs 10%.",
          "When you open a leveraged trade, the broker sets aside the required margin as collateral. It isn't a fee — you get it back when you close — but while the trade is open it reduces the free margin available to absorb losses.",
        ],
        cta: { label: "Calculate required margin", href: "/margin-calculator" },
      },
      {
        h: "A worked example",
        body: [
          "Say you open one standard lot of EUR/USD (100,000 units) at 1.1000 with 30:1 leverage. The notional value is $110,000, so the required margin is $110,000 ÷ 30 ≈ $3,667.",
          "Now the double-edged part: a 1% move in that position is worth about $1,100 — whether it goes your way or against you. On a $10,000 account, a couple of bad 1% swings on an over-leveraged position can wipe out a big chunk of your equity in minutes.",
        ],
      },
      {
        h: "Leverage doesn't change your risk — position size does",
        body: [
          "This is the key insight most beginners miss: leverage by itself doesn't determine how much you lose. Your risk is set by your position size and your stop-loss distance, not by the broker's leverage offer. A trader using 500:1 leverage but sizing positions to risk 1% per trade is far safer than one using 10:1 leverage who bets half the account on a single trade.",
          "Use leverage as a tool to access the position size your risk plan calls for — never as an excuse to trade bigger than that plan allows.",
        ],
        cta: { label: "Size a position for fixed risk", href: "/position-size-calculator" },
      },
      {
        h: "How to use leverage safely",
        body: [
          "Decide your dollar risk per trade first (typically 1–2% of the account), then size the position to fit it and let the required margin fall where it may — as long as it stays well below your balance. Keep a large free-margin cushion so normal volatility can't trigger a margin call.",
          "Lower effective leverage almost always beats higher: it leaves room to be wrong, which is the whole game. The leverage your broker offers is a ceiling, not a target.",
        ],
        cta: { label: "Check your lot size", href: "/lot-size-calculator" },
      },
    ],
    takeaways: [
      "Leverage = position size ÷ capital required; margin % = 100 ÷ leverage.",
      "Higher leverage magnifies gains and losses equally.",
      "Your real risk comes from position size and stop distance, not the leverage ratio.",
      "Keep effective leverage low and free margin high to survive volatility.",
    ],
    faqs: [
      { q: "Is high leverage bad?", a: "High leverage isn't inherently bad, but it's dangerous in undisciplined hands because it makes over-sizing easy. Used with strict position sizing, a high available leverage simply gives flexibility; used to trade oversized, it's the fastest route to a blown account." },
      { q: "What leverage should a beginner use?", a: "Beginners should focus on effective leverage — the size of their positions relative to their account — rather than the broker's maximum. Risking 1% per trade keeps effective leverage low regardless of the ratio offered." },
      { q: "How is margin related to leverage?", a: "Margin is the capital required to open a leveraged position, and it equals the notional value divided by the leverage. As a percentage, margin = 100 ÷ leverage, so 50:1 leverage requires 2% margin." },
    ],
    related: ["margin-calculator", "lot-size-calculator", "position-size-calculator"],
  },

  "how-to-calculate-profit-and-loss": {
    slug: "how-to-calculate-profit-and-loss",
    title: "How to Calculate Profit and Loss on a Trade",
    metaTitle: "How to Calculate Profit and Loss on a Trade (Formula) — PosSize",
    description:
      "Learn how to calculate profit and loss on long and short trades, including commissions and fees, with a simple formula and worked examples.",
    category: "Trade Review",
    readTime: "5 min read",
    updated: "June 26, 2026",
    intro: [
      "Knowing your exact profit or loss on a trade sounds trivial — price went up, you made money — but commissions, fees, and direction (long vs short) trip up more traders than you'd think. Getting it right matters for tax records, performance tracking, and honest self-assessment.",
      "This guide covers the simple P&L formula, how shorts differ from longs, and why net (after-fee) numbers are the only ones that matter.",
    ],
    sections: [
      {
        h: "The basic profit and loss formula",
        body: [
          "For a long trade (you buy, hoping price rises): Profit = (Exit Price − Entry Price) × Quantity − Fees. If you buy 100 shares at $50 and sell at $55 with $10 total commission, your profit is (55 − 50) × 100 − 10 = $490.",
          "The quantity scales everything: the same $5 move is worth $500 on 100 shares but $5,000 on 1,000 shares. That's why position size, not just the price move, drives your results.",
        ],
        cta: { label: "Calculate exact P&L", href: "/profit-loss-calculator" },
      },
      {
        h: "Short trades flip the direction",
        body: [
          "When you short (sell first, hoping to buy back cheaper), profit comes from price falling. The formula becomes: Profit = (Entry Price − Exit Price) × Quantity − Fees. Short 100 shares at $55 and cover at $50 with $10 fees: (55 − 50) × 100 − 10 = $490 profit.",
          "If the price rises instead, the same formula returns a negative number — your loss. Shorting also carries borrowing costs and, in theory, unlimited risk if price keeps climbing, so risk controls matter even more.",
        ],
      },
      {
        h: "Always use net, after-fee numbers",
        body: [
          "Gross profit ignores the cost of trading; net profit subtracts every commission, spread, and fee. For active traders these costs add up fast and can turn an apparently winning system into a losing one. Track net P&L, and know your break-even — the price your trade must reach just to cover costs — before you enter.",
        ],
        cta: { label: "Find your break-even price", href: "/breakeven-calculator" },
      },
      {
        h: "Turn P&L into better decisions",
        body: [
          "Reviewing P&L per trade reveals patterns your gut hides: maybe your winners are small and losers large (a risk/reward problem), or fees are eating scalping profits. Pair P&L with your planned risk on each trade to see whether you're actually following your plan.",
        ],
        cta: { label: "Plan risk/reward first", href: "/risk-reward-calculator" },
      },
    ],
    takeaways: [
      "Long P&L = (Exit − Entry) × Quantity − Fees.",
      "Short P&L = (Entry − Exit) × Quantity − Fees.",
      "Position size scales every dollar of profit and loss.",
      "Only net, after-fee numbers reflect your real result.",
    ],
    faqs: [
      { q: "How do I calculate profit on a trade?", a: "Multiply the price change by your quantity, then subtract all fees. For a long trade: (exit − entry) × shares − fees. For a short: (entry − exit) × shares − fees." },
      { q: "Should I include fees in my P&L?", a: "Always. Gross P&L overstates your performance. Commissions, spreads, swaps and other fees come straight out of your result, and for frequent traders they're often the difference between a profitable and an unprofitable strategy." },
      { q: "How is short-trade profit different?", a: "A short profits when price falls, so you subtract the exit from the entry instead of the other way around. Everything else — quantity scaling and fee deduction — works the same as a long trade." },
    ],
    related: ["profit-loss-calculator", "breakeven-calculator", "risk-reward-calculator"],
  },

  "pip-value-explained": {
    slug: "pip-value-explained",
    title: "Pip Value Explained: How Much Is a Pip Worth?",
    metaTitle: "Pip Value Explained: How Much Is a Pip Worth? — PosSize",
    description:
      "What a pip is, how to calculate pip value for any pair and lot size, and why JPY pairs and account currency change the number.",
    category: "Forex",
    readTime: "5 min read",
    updated: "June 26, 2026",
    intro: [
      "A pip is the smallest standard price move in forex, and pip value is what one pip is worth in money for your specific position. It's the bridge between a price chart (measured in pips) and your account (measured in dollars), so every risk calculation in forex runs through it.",
      "This guide explains what a pip is, how to work out its value, and the two things that change the number: lot size and your account currency.",
    ],
    sections: [
      {
        h: "What exactly is a pip?",
        body: [
          "For most currency pairs, a pip is the fourth decimal place — 0.0001. If EUR/USD moves from 1.1000 to 1.1001, that's one pip. For pairs quoted in Japanese yen, a pip is the second decimal place — 0.01 — because of the way the yen is priced.",
          "Pips let traders talk about price moves in a consistent, whole-number way (\"a 20-pip stop\") regardless of the pair, instead of juggling tiny decimals.",
        ],
      },
      {
        h: "How pip value is calculated",
        body: [
          "Pip value = pip size × position size in units, converted to your account currency. For a standard lot (100,000 units) of a USD-quoted pair, one pip is 0.0001 × 100,000 = $10. A mini lot gives $1 per pip and a micro lot $0.10.",
          "That linear scaling is the whole point: bigger positions make each pip worth more, which is exactly how position size controls your risk per pip of stop-loss.",
        ],
        cta: { label: "Calculate exact pip value", href: "/pip-calculator" },
      },
      {
        h: "Account currency and the quote currency",
        body: [
          "Pip value is first calculated in the pair's quote currency (the second currency), then converted to your account currency. For EUR/USD with a USD account, no conversion is needed — a pip is simply $10 per standard lot. For a pair like EUR/GBP with a USD account, the GBP pip value must be converted to USD using the current rate.",
          "This is why the same pair can show slightly different pip values for traders with different account currencies — the conversion step changes the final number.",
        ],
      },
      {
        h: "Why pip value matters for risk",
        body: [
          "Pip value links your stop-loss (in pips) to your dollar risk. Risk in dollars = stop-loss in pips × pip value × lots. Rearranged, it tells you the lot size that keeps your risk fixed — the core of forex position sizing. Get pip value right and the rest of your risk math falls into place.",
        ],
        cta: { label: "Size your lots from pip risk", href: "/lot-size-calculator" },
      },
    ],
    takeaways: [
      "A pip is 0.0001 for most pairs, 0.01 for JPY pairs.",
      "Pip value ≈ $10 / $1 / $0.10 per pip for standard / mini / micro lots (USD pairs).",
      "Pip value is calculated in the quote currency, then converted to your account currency.",
      "Dollar risk = stop pips × pip value × lots — the foundation of forex sizing.",
    ],
    faqs: [
      { q: "How much is one pip worth?", a: "For a standard lot (100,000 units) of a USD-quoted pair, one pip is worth about $10. A mini lot is about $1 per pip and a micro lot about $0.10. Other quote currencies require a conversion to your account currency." },
      { q: "Why is a pip different for JPY pairs?", a: "Yen pairs are quoted to two decimal places instead of four, so one pip is 0.01 rather than 0.0001. The pip-value calculation is otherwise identical." },
      { q: "Does my account currency change pip value?", a: "Yes. Pip value is first found in the pair's quote currency, then converted to your account currency at the current exchange rate. Traders with different account currencies can see slightly different pip values for the same pair." },
    ],
    related: ["pip-calculator", "lot-size-calculator", "margin-calculator"],
  },
};
