import { paths } from "../../constants/paths"; // Ensure this path is correct
import PaymentChannelCreate from "./entry/PaymentChannelCreate";
import WalletCreate from "./entry/PaymentChannelCreate"; // Adjust the import path as necessary
import PaymentChannelUpdate from "./entry/PaymentChannelUpdate";
import WalletUpdate from "./entry/PaymentChannelUpdate"; // Adjust the import path as necessary
import PaymentChannelList from "./view/PaymentChannelList";
import WalletList from "./view/PaymentChannelList"; // Adjust the import path as necessary

export const PaymentChannelRoute = [
  {
    id: "PaymentChannel-list",
    path: paths.paymentChannelList, // Ensure this is defined in your paths constant
    element: <PaymentChannelList />, // This is where your wallet table or list component will be rendered
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "PaymentChannel", url: paths.paymentChannelList },
        ],
      };
    },
  },
  {
    id: "paymentchannel-new",
    path: paths.paymentChannelCreate, // Ensure this is defined in your paths constant
    element: <PaymentChannelCreate />, // This is the page where users can create a new wallet
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "PaymentChannel", url: paths.paymentChannelList },
          { label: "Create", url: paths.paymentChannelCreate },
        ],
      };
    },
  },
  {
    id: "paymentchannel-detail",
    path: paths.paymentChannelDetail, // Ensure this is defined in your paths constant
    element: <PaymentChannelUpdate />, // This is where users can view or edit a specific wallet's details
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "PaymentChannel", url: paths.paymentChannelList },
        ],
      };
    },
  },
];
