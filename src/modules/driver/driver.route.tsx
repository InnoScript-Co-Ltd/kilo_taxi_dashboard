import { paths } from "../../constants/paths"; // Ensure this path is correct
// import DriverCreate from "./entry/DriverCreate"; // Adjust the import path as necessary
// import DriverUpdate from "./entry/DriverUpdate"; // Adjust the import path as necessary
import DriverList from "./view/DriverList"; // Adjust the import path as necessary
import DriverDetail from "./view/DriverDetail"; // Adjust the import path as necessary
import DriverUpdate from "./entry/DriverUpdate";
import DriverCreate from "./entry/DriverCreate";

export const DriverRoute = [
  {
    id: "driver-list",
    path: paths.driverList, // Ensure this is defined in your paths constant
    element: <DriverList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Drivers", url: paths.driverList },
        ],
      };
    },
  },
  {
    id: "driver-new",
    path: paths.driverCreate, // Ensure this is defined in your paths constant
    element: <DriverCreate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Drivers", url: paths.driverList },
          { label: "Create", url: paths.driverCreate },
        ],
      };
    },
  },
  {
    id: "driver-detail",
    path: paths.driverDetail, // Ensure this is defined in your paths constant
    element: <DriverDetail />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Drivers", url: paths.driverList },
        ],
      };
    },
  },
  {
    id: "customer-update",
    path: paths.driverUpdate,
    element: <DriverUpdate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Drivers", url: paths.driverList },
        ],
      };
    },
  },
];
