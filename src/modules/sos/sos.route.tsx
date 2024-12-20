import { paths } from "../../constants/paths"; // Ensure this path is correct
import SoslList from "./view/SosList";
import SosReceive from "./view/SosReceive";
export const SosRoute = [
  {
    id: "Sos-list",
    path: paths.sosList, // Ensure this is defined in your paths constant
    element: <SoslList />, // This is where your wallet table or list component will be rendered
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Sos", url: paths.sosList },
        ],
      };
    },
  },
  {
    id: "Sos-Receive",
    path: paths.sosReceive, // Ensure this is defined in your paths constant
    element: <SosReceive />, // This is where your wallet table or list component will be rendered
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "SosReceive", url: paths.sosReceive },
        ],
      };
    },
  },
];
