import { FaMapLocationDot } from "react-icons/fa6";
import { TbRoute2 } from "react-icons/tb";
import { FaRoute } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";

export const DASHBOARD_SIDEBAR_LINKS = [
  // {
  //   key: "panel",
  //   label: "Admin Panel",
  //   path: "/admin",
  //   icon: <MdDashboard color="white" />,
  //   subdirector: [],
  // },
  {
    key: "Locations",
    label: "Locations",
    path: "/locations",
    icon: <FaMapLocationDot color="white" />,
    subdirector: [],
  },
  {
    key: "Transportations",
    label: "Transportations",
    path: "/transportations",
    icon: <FaRoute color="white" />,
    subdirector: [],
  },  
  {
    key: "Routes",
    label: "Routes",
    path: "/routes",
    icon: <TbRoute2 color="white" />,
    subdirector: [],
  },
];

export const DASHBOARD_BOTTOM_LINKS = [
  /* {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <IoIosSettings />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/help",
    icon: <IoMdHelp />,
  }, */
  {
    key: "panel",
    label: "Admin Panel",
    path: "/admin",
    icon: <MdDashboard color="white" fontSize={18}/>,
  },
  {
    key: "info",
    label: "Info",
    path: "/info",
    icon: <FaInfoCircle color="white" fontSize={18}/>,
  }
];
