import { paths } from "../../constants/paths"; // Ensure this path is correct
import ExtraDemandCreate from "./entry/ExtraDemandCreate"; // Adjust the import path as necessary
import ExtraDemandUpdate from "./entry/ExtraDemandUpdate"; // Adjust the import path as necessary
import ExtraDemandList from "./view/ExtraDemandList"; // Adjust the import path as necessary

export const ExtraDemandRoute = [
  {
    id: "extraDemand-list",
    path: paths.extraDemandList, // Ensure this is defined in your paths constant
    element: <ExtraDemandList />, // This is where your wallet table or list component will be rendered
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "ExtraDemand", url: paths.extraDemandList },
        ],
      };
    },
  },
  {
    id: "extraDemand-new",
    path: paths.extraDemandCreate, // Ensure this is defined in your paths constant
    element: <ExtraDemandCreate />, // This is the page where users can create a new wallet
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "ExtraDemand", url: paths.extraDemandList },
          { label: "Create", url: paths.extraDemandCreate },
        ],
      };
    },
  },
  {
    id: "extraDemand-detail",
    path: paths.extraDemandDetail, // Ensure this is defined in your paths constant
    element: <ExtraDemandUpdate />, // This is where users can view or edit a specific wallet's details
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "ExtraDemand", url: paths.extraDemandList },
        ],
      };
    },
  },
];
