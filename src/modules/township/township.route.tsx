import { paths } from "../../constants/paths"; // Ensure this path is correct
import TownshipCreate from "./entry/TownshipCreate"; // Adjust the import path as necessary
import TownshipUpdate from "./entry/TownshipUpdate"; // Adjust the import path as necessary
import TownshipList from "./view/TownshipList"; // Adjust the import path as necessary

export const TownshipRoute = [
  {
    id: "township-list",
    path: paths.townshipList, // Ensure this is defined in your paths constant
    element: <TownshipList />, // This is where your wallet table or list component will be rendered
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Township", url: paths.townshipList },
        ],
      };
    },
  },
  {
    id: "township-new",
    path: paths.townshipCreate, // Ensure this is defined in your paths constant
    element: <TownshipCreate />, // This is the page where users can create a new wallet
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Township", url: paths.townshipList },
          { label: "Create", url: paths.townshipCreate },
        ],
      };
    },
  },
  {
    id: "township-detail",
    path: paths.townshipDetail, // Ensure this is defined in your paths constant
    element: <TownshipUpdate />, // This is where users can view or edit a specific wallet's details
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Township", url: paths.townshipList },
        ],
      };
    },
  },
];
