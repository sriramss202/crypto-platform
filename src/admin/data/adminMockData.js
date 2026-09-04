// UI-only presentation data. Replace these exports with API responses in the backend phase.
export const dashboardMetrics = [
  { label: "Total users", value: "1,284", change: "+8.2%", note: "Mock UI value" },
  { label: "New users", value: "86", change: "+12.4%", note: "Mock UI value · last 30 days" },
  { label: "Reward activity", value: "342", change: "+5.7%", note: "Mock UI value · mission events" },
  { label: "Referral activity", value: "57", change: "+3.1%", note: "Mock UI value · referrals" },
];

export const chartBars = [32, 48, 39, 62, 54, 76, 68];

export const users = [
  { id: "USR-1001", email: "maya@example.com", phone: "+91 98765 43210", joined: "Aug 20, 2026", status: "Active" },
  { id: "USR-1002", email: "arjun@example.com", phone: "+91 98765 10203", joined: "Aug 19, 2026", status: "Active" },
  { id: "USR-1003", email: "riya@example.com", phone: "+91 98765 77889", joined: "Aug 17, 2026", status: "Pending" },
  { id: "USR-1004", email: "dev@example.com", phone: "+91 98765 44012", joined: "Aug 14, 2026", status: "Inactive" },
];

export const referralRows = [
  { id: "REF-201", referrer: "maya@example.com", referred: "sam@example.com", joined: "Today", status: "Completed", reward: "500 pts" },
  { id: "REF-202", referrer: "arjun@example.com", referred: "nina@example.com", joined: "Yesterday", status: "Pending", reward: "—" },
  { id: "REF-203", referrer: "riya@example.com", referred: "lee@example.com", joined: "Aug 18, 2026", status: "Completed", reward: "500 pts" },
];

export const rewardRows = [
  { id: "MSN-01", name: "Complete First Trade", type: "Daily mission", reward: "200 pts", status: "Active" },
  { id: "MSN-02", name: "Refer a Friend", type: "Daily mission", reward: "500 pts", status: "Active" },
  { id: "MSN-03", name: "Trade 20 Times", type: "Weekly mission", reward: "1,200 pts", status: "Active" },
  { id: "MSN-04", name: "First Trade", type: "Milestone", reward: "Bonus reward", status: "Active" },
];

export const notificationRows = [
  { id: "ALT-001", title: "Bitcoin (BTC) Price Surge", condition: "BTC crosses $95,000", status: "Active" },
  { id: "ALT-002", title: "Ethereum Volatility", condition: "5% change in 1 hour", status: "Active" },
  { id: "ALT-003", title: "Solana Alert", condition: "SOL reaches $250", status: "Pending" },
];
