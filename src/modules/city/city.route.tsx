import { paths } from "../../constants/paths"; // Ensure this path is correct
import CityCreate from "./entry/CityCreate"; // Adjust the import path as necessary
import CityUpdate from "./entry/CityUpdate"; // Adjust the import path as necessary
import CityList from "./view/CityList"; // Adjust the import path as necessary

export const CityRoute = [
  {
    id: "city-list",
    path: paths.cityList, // Ensure this is defined in your paths constant
    element: <CityList />, // This is where your wallet table or list component will be rendered
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "City", url: paths.cityList },
        ],
      };
    },
  },
  {
    id: "city-new",
    path: paths.cityCreate, // Ensure this is defined in your paths constant
    element: <CityCreate />, // This is the page where users can create a new wallet
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "City", url: paths.cityList },
          { label: "Create", url: paths.cityCreate },
        ],
      };
    },
  },
  {
    id: "city-detail",
    path: paths.cityDetail, // Ensure this is defined in your paths constant
    element: <CityUpdate />, // This is where users can view or edit a specific wallet's details
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "City", url: paths.cityList },
        ],
      };
    },
  },
];
