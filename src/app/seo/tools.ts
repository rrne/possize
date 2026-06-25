// Long-form, crawlable content for each calculator. This is what gives the
// otherwise-thin tool pages real ranking surface (how-to, formula, worked
// example) and powers the FAQPage / WebApplication structured data.

export type FAQ = { q: string; a: string };

export type ToolContent = {
  slug: string;
  name: string;
  category: string;
  intro: string[];
  steps: string[];
  formula: { expr: string; note?: string };
  example: string[];
  faqs: FAQ[];
};

export const TOOL_ORDER = [
  "position-size-calculator",
  "risk-reward-calculator",
  "compound-interest-calculator",
  "profit-loss-calculator",
  "pip-calculator",
  "margin-calculator",
  "lot-size-calculator",
  "breakeven-calculator",
] as const;

export const TOOLS: Record<string, ToolContent> = {
  "position-size-calculator": {
    slug: "position-size-calculator",
    name: "Position Size Calculator",
    category: "Risk Management",
    intro: [
      "A position size calculator tells you exactly how many shares, contracts, or units to trade so that — if your stop-loss is hit — you lose only a fixed, pre-decided percentage of your account. Position sizing is widely considered the single most important habit separating consistent traders from accounts that blow up.",
      "Instead of guessing how big a trade should be, you anchor every position to your risk tolerance and the distance to your stop. The result is steadier equity curves and the freedom to be wrong many times in a row without serious damage.",
    ],
    steps: [
      "Enter your total account balance — the capital you actually trade with.",
      "Choose the percentage you are willing to risk on this trade. Most professionals risk 1–2% per position.",
      "Enter your planned entry price and your stop-loss price. The gap between them is your risk per share.",
      "Optionally add a take-profit price and per-side commission to see your risk/reward and net numbers.",
      "Read the recommended position size — the maximum shares you can hold while keeping your loss within budget.",
    ],
    formula: {
      expr: "Position Size = (Account Balance × Risk %) ÷ |Entry Price − Stop-Loss Price|",
      note: "The numerator is the most money you allow yourself to lose; the denominator is how much you lose per share if the stop is hit.",
    },
    example: [
      "Suppose you have a $10,000 account and risk 2% per trade, so your maximum loss is $200.",
      "You plan to buy at $150 with a stop-loss at $145, making your risk $5 per share.",
      "Position size = $200 ÷ $5 = 40 shares. Buying 40 shares means a stop-out costs exactly $200 — your planned 2%.",
    ],
    faqs: [
      { q: "How much of my account should I risk per trade?", a: "Most experienced traders risk 1–2% of their account on any single trade. Risking more than 3–5% means a normal losing streak can quickly cause severe drawdowns that are mathematically hard to recover from." },
      { q: "What is position sizing in trading?", a: "Position sizing is the process of deciding how large a trade should be based on your account size, your risk tolerance, and the distance to your stop-loss — rather than a fixed dollar amount or a gut feeling." },
      { q: "Does this calculator work for forex and crypto?", a: "Yes. The same formula applies to any market — enter the price levels in the instrument's units. For forex, size in units or lots; for crypto, use the coin price and your stop distance." },
      { q: "Why is position sizing more important than picking winners?", a: "Even a strategy with a high win rate will eventually hit a losing streak. Correct position sizing guarantees that no single trade — or run of trades — can do irreversible damage, which is what keeps you in the game long enough to profit." },
    ],
  },

  "risk-reward-calculator": {
    slug: "risk-reward-calculator",
    name: "Risk/Reward Calculator",
    category: "Trade Planning",
    intro: [
      "A risk/reward calculator compares how much you stand to lose if a trade fails against how much you stand to gain if it works. Expressed as a ratio like 1:2, it is the fastest way to judge whether a setup is even worth taking before you commit capital.",
      "Knowing your risk/reward also tells you the minimum win rate you need to break even. A trade with a 1:3 ratio can be profitable while losing most of the time — which is why disciplined traders screen every idea through this lens.",
    ],
    steps: [
      "Enter your entry price — where you plan to open the position.",
      "Enter your stop-loss price — the distance to it defines your risk.",
      "Enter your take-profit / target price — the distance to it defines your reward.",
      "Read the risk/reward ratio and the minimum win rate required to break even at that ratio.",
    ],
    formula: {
      expr: "Risk/Reward = (Target − Entry) ÷ (Entry − Stop-Loss)   •   Break-even Win Rate = 1 ÷ (1 + R/R)",
      note: "A 1:2 ratio needs only a ~33% win rate to break even; a 1:3 ratio needs ~25%.",
    },
    example: [
      "You enter at $100 with a stop at $95 (risk $5) and a target at $115 (reward $15).",
      "Risk/reward = $15 ÷ $5 = 1:3.",
      "Break-even win rate = 1 ÷ (1 + 3) = 25%. As long as more than a quarter of your 1:3 trades win, you are profitable.",
    ],
    faqs: [
      { q: "What is a good risk/reward ratio?", a: "Many traders look for at least 1:2 — risking one unit to make two. Higher ratios let you stay profitable with a lower win rate, but very high targets are hit less often, so the right ratio depends on your strategy's typical win rate." },
      { q: "How do I calculate the minimum win rate I need?", a: "Use Break-even Win Rate = 1 ÷ (1 + Risk/Reward). For a 1:2 trade that is 1 ÷ 3 ≈ 33%; for 1:1 it is 50%. Win more often than this and the strategy is profitable before costs." },
      { q: "Should I take a trade with a ratio below 1:1?", a: "Generally no. A ratio below 1:1 means you need to win more than half your trades just to break even, which is difficult to sustain. Most planning frameworks require a minimum of 1:1.5 or 1:2." },
      { q: "Does risk/reward guarantee profit?", a: "No single metric does. Risk/reward must be paired with a realistic win rate and consistent execution. A great ratio on setups you rarely win is not an edge." },
    ],
  },

  "compound-interest-calculator": {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    category: "Account Growth",
    intro: [
      "A compound interest calculator shows how a trading account or investment grows when returns are reinvested period after period. Because each period earns a return on the previous period's gains, growth accelerates over time — the effect Einstein supposedly called the eighth wonder of the world.",
      "For traders, this tool reframes performance: a modest, repeatable monthly return compounded over years often beats chasing occasional big wins. It makes the long-term cost of drawdowns and the power of consistency visible.",
    ],
    steps: [
      "Enter your starting capital — the principal you begin with.",
      "Enter your expected return rate per period (for example, a monthly percentage).",
      "Enter the number of periods you want to project forward.",
      "Read the projected ending balance and total growth from compounding.",
    ],
    formula: {
      expr: "Future Value = Principal × (1 + Rate)^Periods",
      note: "Rate and Periods must use the same unit — a monthly rate with a number of months, for example.",
    },
    example: [
      "Start with $10,000 and earn a steady 3% per month for 24 months.",
      "Future Value = $10,000 × (1.03)^24 ≈ $20,328.",
      "Reinvesting that 3% roughly doubles the account in two years — far more than 3% × 24 = 72% of simple, non-compounded growth.",
    ],
    faqs: [
      { q: "What is compound interest?", a: "Compound interest is interest calculated on both the original principal and the accumulated interest from previous periods. Reinvested returns themselves start earning returns, which makes a balance grow faster over time than simple interest." },
      { q: "Is a high monthly return realistic for trading?", a: "Be conservative. Sustained monthly returns above a few percent are very difficult to maintain. Use modest, realistic rates when projecting — overestimating compounding leads to dangerous expectations." },
      { q: "How does compounding interact with drawdowns?", a: "Losses compound too. A 50% loss requires a 100% gain to recover, so protecting capital matters as much as growing it. Smooth, consistent returns compound far better than volatile ones with the same average." },
      { q: "What's the difference between simple and compound interest?", a: "Simple interest is earned only on the principal each period. Compound interest is earned on the principal plus all previously earned interest, so the balance grows exponentially rather than linearly." },
    ],
  },

  "profit-loss-calculator": {
    slug: "profit-loss-calculator",
    name: "Profit / Loss Calculator",
    category: "Trade Review",
    intro: [
      "A profit and loss (P&L) calculator gives you the exact monetary result of a trade after accounting for entry price, exit price, position size, and commissions. It works for both long positions (buy then sell) and short positions (sell then buy).",
      "Knowing your real, net-of-fees P&L — not just the price move — is essential for honest performance review. Commissions and the direction of the trade can meaningfully change the outcome, especially on smaller moves.",
    ],
    steps: [
      "Choose whether the trade is long or short.",
      "Enter your entry price and exit price.",
      "Enter the number of shares, contracts, or units.",
      "Add commissions or fees per side to see your true net profit or loss.",
    ],
    formula: {
      expr: "Long P&L = (Exit − Entry) × Size − Fees   •   Short P&L = (Entry − Exit) × Size − Fees",
      note: "A short profits when price falls, so its formula is the mirror image of a long.",
    },
    example: [
      "You buy (long) 100 shares at $50 and sell at $55, paying $1 commission per side.",
      "Gross P&L = ($55 − $50) × 100 = $500. Net P&L = $500 − $2 = $498.",
      "Had you shorted instead — selling at $50 and covering at $55 — you would have lost $5 per share plus fees.",
    ],
    faqs: [
      { q: "How do I calculate profit or loss on a trade?", a: "Multiply the price difference by your position size, then subtract all commissions and fees. For a long, profit = (exit − entry) × size; for a short, profit = (entry − exit) × size." },
      { q: "How is a short trade's P&L different from a long's?", a: "A short position profits when the price falls and loses when it rises — the exact opposite of a long. The formula simply swaps entry and exit in the price-difference term." },
      { q: "Do commissions really matter?", a: "On small price moves and high-frequency trading, yes — fees can turn a small gross gain into a net loss. Always include round-trip costs (both the entry and the exit) when reviewing results." },
      { q: "Does this account for taxes or swap fees?", a: "This tool covers entry, exit, size, and trading commissions. Taxes, overnight swap/financing charges, and currency conversion vary by broker and jurisdiction and should be added separately." },
    ],
  },

  "pip-calculator": {
    slug: "pip-calculator",
    name: "Pip Calculator",
    category: "Forex",
    intro: [
      "A pip calculator converts the smallest standard price movement in forex — a pip — into a real money value for your specific position. Because a pip is worth a different amount depending on the pair, lot size, and your account currency, knowing its value is fundamental to sizing forex trades and stops correctly.",
      "Once you know how much one pip is worth, you can instantly translate a stop-loss measured in pips into a dollar (or euro, yen, etc.) risk — and size your position accordingly.",
    ],
    steps: [
      "Select the currency pair you are trading. JPY pairs use a pip size of 0.01; most others use 0.0001.",
      "Choose your lot type (standard, mini, or micro) and the number of lots.",
      "Enter your account currency and, if it differs from the quote currency, the conversion rate.",
      "Read the value per pip, plus handy multiples like the value of 10 and 100 pips.",
    ],
    formula: {
      expr: "Pip Value = Pip Size × Units Traded × (Quote → Account Rate)",
      note: "Pip Size is 0.0001 for most pairs and 0.01 for JPY pairs; one standard lot is 100,000 units.",
    },
    example: [
      "Trading 1 standard lot (100,000 units) of EUR/USD with a USD account.",
      "Pip Value = 0.0001 × 100,000 × 1 = $10 per pip.",
      "A 20-pip stop-loss therefore risks $200 — letting you size the trade to your account's risk budget.",
    ],
    faqs: [
      { q: "What is a pip in forex?", a: "A pip (percentage in point) is the standard smallest price increment for a currency pair — 0.0001 for most pairs and 0.01 for pairs quoted in Japanese yen. It is the unit traders use to measure price movement and stop distances." },
      { q: "How much is one pip worth?", a: "It depends on position size and pair. For one standard lot (100,000 units) of a pair quoted in your account currency, one pip is about 10 units of that currency — for a USD account that's $10. Mini lots are ~$1 and micro lots ~$0.10." },
      { q: "Why is pip value different for JPY pairs?", a: "Yen pairs are quoted to two decimal places, so their pip size is 0.01 instead of 0.0001. The larger pip size is offset by the exchange rate, but you must use 0.01 when calculating pip value for any pair containing JPY." },
      { q: "How do I convert pip value to my account currency?", a: "Multiply the pip value in the quote currency by the exchange rate from the quote currency to your account currency. If the quote currency already matches your account, the rate is simply 1." },
    ],
  },

  "margin-calculator": {
    slug: "margin-calculator",
    name: "Margin Calculator",
    category: "Leverage",
    intro: [
      "A margin calculator shows how much of your own capital you must put up to open a leveraged position. With leverage, you control a large notional value with a small deposit — the required margin — so knowing that number before you trade is essential to avoid over-leveraging and margin calls.",
      "By comparing the required margin to your account balance, you can see how much buying power a trade consumes and whether you have enough cushion to survive normal price swings.",
    ],
    steps: [
      "Enter your position size in units, shares, or contracts, and the entry price.",
      "Choose your leverage (for example 30:1) using the presets, or enter your own.",
      "Optionally enter your account balance to see how much of it the trade uses.",
      "If the instrument is priced in another currency, add the conversion rate to your account currency.",
    ],
    formula: {
      expr: "Required Margin = Notional Value ÷ Leverage,   where Notional Value = Units × Price × Rate",
      note: "Margin requirement as a percentage equals 100 ÷ Leverage — 30:1 leverage requires about 3.33% margin.",
    },
    example: [
      "You open 100,000 units of a pair at 1.1000 with 30:1 leverage and a USD account (rate 1).",
      "Notional Value = 100,000 × 1.1000 = $110,000. Required Margin = $110,000 ÷ 30 ≈ $3,667.",
      "On a $10,000 account that single position ties up roughly 37% of your capital as margin.",
    ],
    faqs: [
      { q: "What is margin in trading?", a: "Margin is the amount of your own capital a broker requires you to deposit to open and maintain a leveraged position. It is not a fee — it's collateral set aside while the trade is open and returned when you close it." },
      { q: "How is required margin calculated?", a: "Required Margin = Notional Value ÷ Leverage. The notional value is your position size multiplied by the price (converted to your account currency). Higher leverage means a smaller margin requirement for the same position." },
      { q: "What leverage should I use?", a: "Lower leverage is safer because it leaves more free margin to absorb adverse moves. Many cautious traders keep effective leverage low even when the broker offers far more — high leverage magnifies losses just as much as gains." },
      { q: "What is a margin call?", a: "A margin call happens when losses erode your equity below the broker's maintenance requirement. The broker may ask you to add funds or automatically close positions. Keeping required margin well below your balance reduces this risk." },
    ],
  },
  "lot-size-calculator": {
    slug: "lot-size-calculator",
    name: "Lot Size Calculator",
    category: "Forex",
    intro: [
      "A lot size calculator tells you exactly how many lots to trade so a losing trade costs only a fixed, pre-decided amount of your account. In forex, position size is measured in lots — a standard lot is 100,000 units, a mini lot 10,000, and a micro lot 1,000 — and getting that number right is the core of survivable risk management.",
      "Instead of guessing, you anchor every trade to three things you already know: how much you'll risk, how far away your stop-loss sits in pips, and the value of one pip. The calculator turns those into the precise lot size that keeps your risk constant trade after trade.",
    ],
    steps: [
      "Enter your account balance — the capital you actually trade with.",
      "Choose the percentage of the account you're willing to risk on this trade (most professionals use 1–2%).",
      "Enter your stop-loss distance in pips — the gap between your entry and your stop.",
      "Enter the pip value per standard lot for your pair (about $10 for most USD-quoted pairs). The calculator returns the exact lot size.",
    ],
    formula: {
      expr: "Lots = (Account × Risk%) ÷ (Stop-Loss in pips × Pip Value per standard lot)",
      note: "Multiply the result by 100,000 for units, or by 10 / 100 to express it in mini / micro lots.",
    },
    example: [
      "You have a $10,000 account and risk 1% ($100) on a EUR/USD trade with a 25-pip stop. Pip value is $10 per standard lot.",
      "Lots = $100 ÷ (25 × $10) = $100 ÷ $250 = 0.40 standard lots.",
      "That's 40,000 units (4 mini lots). If price hits your stop 25 pips away, you lose exactly $100 — your planned 1%.",
    ],
    faqs: [
      { q: "What is a lot in forex?", a: "A lot is the standard unit of trade size. One standard lot is 100,000 units of the base currency, a mini lot is 10,000 units (0.1 lots), and a micro lot is 1,000 units (0.01 lots). Lot size determines how much each pip move is worth." },
      { q: "How do I calculate the correct lot size?", a: "Divide the cash you're willing to risk (account × risk%) by your stop-loss distance in pips multiplied by the pip value per lot. The result is the lot size that caps your loss at exactly your chosen risk." },
      { q: "What pip value should I enter?", a: "For pairs quoted in USD (like EUR/USD or GBP/USD), one pip is worth about $10 per standard lot. For other pairs it varies with the exchange rate — use our pip calculator to find the exact figure, then bring it back here." },
      { q: "Why does lot size matter so much?", a: "Trading too large is the fastest way to blow up an account. By sizing every position to a fixed percentage risk, a string of losses does only limited, predictable damage — letting you stay in the game long enough for your edge to play out." },
    ],
  },
  "breakeven-calculator": {
    slug: "breakeven-calculator",
    name: "Break-Even Calculator",
    category: "Trade Review",
    intro: [
      "A break-even calculator shows the exact price your trade must reach just to cover its costs — entry commission, exit commission, and any fees — before a single dollar of profit appears. Because every trade starts slightly underwater thanks to fees, knowing your true break-even keeps your targets and stops realistic.",
      "It's especially useful for active traders and scalpers, where commissions are a meaningful slice of each move, and for anyone comparing brokers: lower fees pull your break-even closer to your entry, leaving more of every move as profit.",
    ],
    steps: [
      "Enter the price at which you entered the trade.",
      "Enter your position size — the number of shares, contracts, or units.",
      "Add the total commission or fees you'll pay to enter and to exit.",
      "The calculator returns the price you must reach to break even, and how far that is from your entry.",
    ],
    formula: {
      expr: "Break-Even Price = Entry Price + (Total Fees ÷ Shares)   (for a long position)",
      note: "For a short position the fees are subtracted instead: Break-Even = Entry − (Total Fees ÷ Shares).",
    },
    example: [
      "You buy 200 shares at $50.00, paying $5 commission to enter and $5 to exit — $10 in total fees.",
      "Break-Even = $50.00 + ($10 ÷ 200) = $50.00 + $0.05 = $50.05.",
      "The stock must rise five cents just to cover costs; anything above $50.05 is profit, anything below is a loss.",
    ],
    faqs: [
      { q: "What is a break-even price?", a: "It's the price at which your trade's profit is exactly zero — the point where the gain on the position precisely offsets all the commissions and fees you paid to open and close it. Above it (for a long) you profit; below it you lose." },
      { q: "How do fees affect break-even?", a: "Every fee pushes your break-even further from your entry: higher costs mean the price has to move more before you're in profit. This is why low-commission brokers matter most for high-frequency or small-move strategies." },
      { q: "Does break-even differ for short trades?", a: "Yes. For a short position you profit when price falls, so fees lower your break-even: you subtract the per-share fee from your entry. The price must drop below that level before the trade turns profitable." },
      { q: "Should I set my stop at break-even?", a: "Many traders move their stop to break-even once a trade moves in their favour, locking in a no-loss outcome. Remember to use the true break-even that includes fees, not just your raw entry price, so a stopped-out trade really is flat." },
    ],
  },
};
