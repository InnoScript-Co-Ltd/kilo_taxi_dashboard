import { paths } from "../../constants/paths"; // Ensure this path is correct
import TravelRateCreate from "./entry/TravelRateCreate";
import TravelRateUpdate from "./entry/TravelRateUpdate";
import TravelRateList from "./view/TravelRateList";

export const TravelRateRoute = [
  {
    id: "travelrate-list",
    path: paths.travelRateList, // Ensure this is defined in your paths constant
    element: <TravelRateList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "TravelRate", url: paths.travelRateList },
        ],
      };
    },
  },
  {
    id: "travelrate-new",
    path: paths.travelRateCreate, // Ensure this is defined in your paths constant
    element: <TravelRateCreate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "TravelRate", url: paths.travelRateList },
          { label: "Create", url: paths.travelRateCreate },
        ],
      };
    },
  },
  {
    id: "travelrate-detail",
    path: paths.travelRateDetail, // Ensure this is defined in your paths constant
    element: <TravelRateUpdate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "TravelRate", url: paths.travelRateList },
        ],
      };
    },
  },
];
