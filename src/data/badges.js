export const USER_EPOCH_POINTS = 0;
export const badges = [
  {
    id: 1,
    name: "Scout",
    image: "https://cdn.i5.xyz/badge/scout_badge.png",
    requiredPoints: 0,
    description: "Beginning of your trading journey. Initiate first trades and explore the market ecosystem.",
    reward: "Scout Title & 50 XP",
    status: "current",
    unlockedAt: "Aug 27, 2026",
    perks: ["Basic Market Access", "5% Trading Fee Rebate", "Scout Avatar Border"],
    iconType: "compass"
  },
  {
    id: 2,
    name: "Speculator",
    image: "https://cdn.i5.xyz/badge/speculator.png",
    requiredPoints: 1000,
    description: "Formulate market hypotheses and execute short-term positions across spot & perpetuals.",
    reward: "Speculator Title & 200 XP",
    status: "locked",
    unlockedAt: null,
    perks: ["Advanced Order Types", "Priority Order Routing", "Community Alpha Chat"],
    iconType: "trending"
  },
  {
    id: 3,
    name: "Risk Taker",
    image: "https://cdn.i5.xyz/badge/risk_taker.png",
    requiredPoints: 3000,
    description: "Embrace leverage and volatile pairs with disciplined risk management & stop-loss rules.",
    reward: "Risk Taker Badge & 500 XP",
    status: "locked",
    unlockedAt: null,
    perks: ["10x Leverage Unlock", "Risk Analysis Dashboard", "Custom Price Trigger Alerts"],
    iconType: "zap"
  },
  {
    id: 4,
    name: "Opportunity Hunter",
    image: "https://cdn.i5.xyz/badge/opportunity_hunter.png",
    requiredPoints: 7000,
    description: "Capitalize on market inefficiencies, arbitrage spreads, and sudden liquidity spikes.",
    reward: "Hunter Crest & 1,200 XP",
    status: "locked",
    unlockedAt: null,
    perks: ["Arbitrage Signal Feed", "0.02% Taker Fee Reduction", "Hunter Profile Flair"],
    iconType: "target"
  },
  {
    id: 5,
    name: "Position Architect",
    image: "  https://cdn.i5.xyz/badge/position_architect.png",
    requiredPoints: 25000,
    description: "Construct multi-leg options, hedging strategies, and algorithmic rebalancing portfolios.",
    reward: "Architect Title & 2,500 XP",
    status: "locked",
    unlockedAt: null,
    perks: ["Algo Order Execution Engine", "Multi-Leg Hedging Suite", "Custom Webhooks"],
    iconType: "layers"
  },
  {
    id: 6,
    name: "Yield Conqueror",
    image: "	https://cdn.i5.xyz/badge/capital_Commander.png",
    requiredPoints: 50000,
    description: "Master DeFi liquidity pools, auto-compounding vaults, and cross-chain yield strategies.",
    reward: "Yield Banner & 5,000 XP",
    status: "locked",
    unlockedAt: null,
    perks: ["Auto-Compound Vault Access", "+15% Staking Yield Boost", "Zero Withdrawal Fees"],
    iconType: "coins"
  },
  {
    id: 7,
    name: "Alpha Generator",
    image: "	https://cdn.i5.xyz/badge/volatality_rider.png",
    requiredPoints: 100000,
    description: "Consistently outperform market benchmarks with proprietary analytical models.",
    reward: "Alpha Insignia & 10,000 XP",
    status: "locked",
    unlockedAt: null,
    perks: ["VIP Alpha Signal Lounge", "Zero Maker Fees", "Exclusive Whale Telegram Group"],
    iconType: "sparkles"
  },
  {
    id: 8,
    name: "Volatility Rider",
    image: "https://cdn.i5.xyz/badge/alpha_generator.png",
    requiredPoints: 250000,
    description: "Thrive in macro turbulence, navigating black swan events and liquidation cascades.",
    reward: "Storm Rider Aura & 25,000 XP",
    status: "locked",
    unlockedAt: null,
    perks: ["Liquidation Cascade Alert System", "1-on-1 Trading Advisor", "VIP Event Access"],
    iconType: "activity"
  },
  {
    id: 9,
    name: "Capital Commander",
    image: "	https://cdn.i5.xyz/badge/yield_conqueror.png",
    requiredPoints: 500000,
    description: "Command institutional-scale liquidity, leading market pools and shaping venue orderbooks.",
    reward: "Commander Crown & 50,000 XP",
    status: "locked",
    unlockedAt: null,
    perks: ["Institutional OTC Desk", "100x API Rate Limits", "Direct Exchange Colocation"],
    iconType: "crown"
  },
  
];
export default badges;