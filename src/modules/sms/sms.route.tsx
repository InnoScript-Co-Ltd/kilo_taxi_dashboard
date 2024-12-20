import { paths } from "../../constants/paths"; // Ensure this path is correct
import SmsCreate from "./entry/SmsCreate";
import SmsUpdate from "./entry/SmsUpdate";
import SmsList from "./view/SmsList";

export const SmsRoute = [
  {
    id: "sms-list",
    path: paths.smsList, // Ensure this is defined in your paths constant
    element: <SmsList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Sms", url: paths.smsList },
        ],
      };
    },
  },
  {
    id: "sms-new",
    path: paths.smsCreate, // Ensure this is defined in your paths constant
    element: <SmsCreate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Sms", url: paths.smsList },
          { label: "Create", url: paths.smsCreate },
        ],
      };
    },
  },
  {
    id: "sms-detail",
    path: paths.smsDetail, // Ensure this is defined in your paths constant
    element: <SmsUpdate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Sms", url: paths.smsList },
        ],
      };
    },
  },
];
