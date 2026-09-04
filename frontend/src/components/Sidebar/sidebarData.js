import {
  FaHome,
  FaChartPie,
  FaGift,
  FaBell,
  FaUser,
} from "react-icons/fa";

const sidebarData = [
  {
    title: "BitPal Trade",
    path: "/app",
    icon: <FaHome />,
  },
  {
    title: "Dashboard",
    path: "/app/dashboard",
    icon: <FaChartPie />,
  },
  {
    title: "Mission & Rewards",
    path: "/app/rewards",
    icon: <FaGift />,
  },
  {
    title: "Alerts",
    path: "/app/alerts",
    icon: <FaBell />,
  },
  {
    title: "Profile",
    path: "/app/profile",
    icon: <FaUser />,
  },
];

export default sidebarData;