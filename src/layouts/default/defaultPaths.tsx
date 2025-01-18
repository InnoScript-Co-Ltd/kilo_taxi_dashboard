import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import DiscountIcon from "@mui/icons-material/Discount";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NoteIcon from "@mui/icons-material/Note";
import CreditCardIcon from "@mui/icons-material/CreditCard";

export const navigationList = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    isParent: false,
  },
  {
    segment: "auth",
    title: "Auth",
    icon: null,
    isParent: false
  },
  {
    segment: "admin",
    title: "Admin",
    isParent: true,
    icon: <AdminPanelSettingsIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "city",
    title: "City",
    isParent: true,
    icon: <AdminPanelSettingsIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "customer",
    title: "Customer",
    isParent: true,
    icon: <RecentActorsIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "promotion",
    title: "Promotion",
    isParent: true,
    icon: <DiscountIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "schedule",
    title: "Schedule",
    isParent: true,
    icon: <DepartureBoardIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "driver",
    title: "Driver",
    isParent: true,
    icon: <PersonIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "vehicle",
    title: "Vehicle",
    isParent: true,
    icon: <DirectionsCarIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "vehicleType",
    title: "VehicleType",
    isParent: true,
    icon: <DirectionsCarIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "wallet",
    title: "Wallet",
    isParent: true,
    icon: <AccountBalanceWalletIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "order",
    title: "Order",
    isParent: true,
    icon: <AccountBalanceWalletIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "paymentChannel",
    title: "PaymentChannel",
    isParent: true,
    icon: <FormatListBulletedIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "travelRate",
    title: "TravelRate",
    isParent: true,
    icon: <AdminPanelSettingsIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "sos",
    title: "Sos",
    isParent: true,
    icon: <FormatListBulletedIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
      {
        segment: "receive",
        title: "Sos Receive",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "review",
    title: "Review",
    isParent: true,
    icon: <AccountBalanceWalletIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "reason",
    title: "Reason",
    isParent: true,
    icon: <NoteIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "sms",
    title: "Sms",
    isParent: true,
    icon: <DashboardIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "topupTransaction",
    title: "TopupTransaction",
    isParent: true,
    icon: <CreditCardIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
  {
    segment: "simulation",
    title: "Simulation",
    isParent: true,
    icon: <DashboardIcon />,
    children: [
      {
        segment: "order",
        title: "Order Create",
        icon: <FormatListBulletedIcon />,
      },
    ],
  },

  {
    segment: "extraDemand",
    title: "Extra Demand Charges",
    isParent: true,
    icon: <DashboardIcon />,
    children: [
      {
        segment: "list",
        title: "List",
        icon: <FormatListBulletedIcon />,
      },
      
    ],
  },

  // {
  //   segment: 'country',
  //   title: 'Country',
  //   isParent: true,
  //   icon: <FlagCircle />,
  //   children: [
  //     {
  //       segment: 'list',
  //       title: 'List',
  //       icon: <FormatListBulletedIcon />,
  //     },
  //   ],
  // },
  // {
  //   segment: 'state',
  //   title: 'State',
  //   isParent: true,
  //   icon: <PublicIcon  />,
  //   children: [
  //     {
  //       segment: 'list',
  //       title: 'List',
  //       icon: <FormatListBulletedIcon />,
  //     },
  //   ],
  // },
];
