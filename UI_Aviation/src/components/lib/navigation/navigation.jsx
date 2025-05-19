import { IoPerson, IoBusiness } from "react-icons/io5";
import { SiHsbc } from "react-icons/si";
import { FaBook } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { TbRoute2 } from "react-icons/tb";
import { IoMdList, IoIosSettings, IoMdHelp } from "react-icons/io";
import { GiCargoShip } from "react-icons/gi";
import { FaAnchor, FaRoute, FaList } from "react-icons/fa";
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
  // {
  //   key: "person",
  //   label: "Person of Maritime Interest",
  //   path: "/person",
  //   icon: <IoPerson color="white" />,
  //   subdirector: [
  //     {
  //       key: "crew-operations",
  //       label: "Crew Operations",
  //       path: "/person/crew-operations",
  //       icon: <FaList color="white" />,
  //     },
  //     {
  //       key: "person-query",
  //       label: "Person Maritime Records",
  //       path: "/person/person-query",
  //       icon: <FaList color="white" />,
  //     }
  //   ],
  // },
  // {
  //   key: "ihs",
  //   label: "IHS / Llyods",
  //   path: "/ihs",
  //   icon: <SiHsbc color="white" />,
  //   subdirector: [],
  // },
  // /*   {
  //   key: "lloyds",
  //   label: "Lloyds MIU",
  //   path: "/lloyds",
  //   icon: <FaBook color="white" />,
  //   subdirector: [],
  // }, */
  // {
  //   key: "mou",
  //   label: "MOU Detention Lists",
  //   path: "/mou",
  //   icon: <IoMdList color="white" />,
  // },
  // {
  //   key: "msc",
  //   label: "MSC Application",
  //   path: "/msc",
  //   icon: <GiCargoShip color="white" />,
  //   subdirector: [
  //     {
  //       key: "vessel-operations",
  //       label: "Vessel Operations",
  //       path: "/msc/vessel-operations",
  //       icon: <FaList color="white" />,
  //     },
  //     {
  //       key: "vessel-query",
  //       label: "Vessel Crew Records",
  //       path: "/msc/vessel-query",
  //       icon: <FaList color="white" />,
  //     },
  //   ],
  // },
  // {
  //   key: "ports",
  //   label: "Ports",
  //   path: "/ports",
  //   icon: <FaAnchor color="white" />,
  //   subdirector: [
  //     {
  //       key: "port-map",
  //       label: "Map",
  //       path: "/ports/map",
  //       icon: <FaList color="white" />,
  //     },
  //   ],
  // },
  // {
  //   key: "shipping",
  //   label: "Shipping Routes Network",
  //   path: "/shipping",
  //   icon: <FaRoute color="white" />,
  //   subdirector: [],
  // },
  // {
  //   key: "maritime",
  //   label: "Maritime Organizations",
  //   path: "/organization",
  //   icon: <IoBusiness color="white" />,
  //   subdirector: [
  //     {
  //       key: "organization-query",
  //       label: "Organization Vessel Records",
  //       path: "/organization/organization-query",
  //       icon: <FaList color="white" />,
  //     },
  //   ],
  // },
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
