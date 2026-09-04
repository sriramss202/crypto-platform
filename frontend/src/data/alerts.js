import {
  CheckCircle2,
  Bell,
  ShieldAlert,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    icon: CheckCircle2,
    title: "Bitcoin (BTC) Price Surge",
    description: "Trigger when BTC crosses $95,000",
    status: "Active",
  },
  {
    id: 2,
    icon: ShieldAlert,
    title: "Ethereum Volatility",
    description: "Trigger on 5% change in 1 hour",
    status: "Active",
  },
  {
    id: 3,
    icon: Bell,
    title: "Solana Alert",
    description: "Notify when SOL reaches $250",
    status: "Pending",
  },
  {
    id: 4,
    icon: Bell,
    title: "solana alert",
    description: "notify when sol reaches $2222",
    status: "pending",
  }
];

export default alerts;