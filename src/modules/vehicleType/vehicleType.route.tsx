import { paths } from "../../constants/paths"; // Ensure this path is correct
import VehicleTypeCreate from "./entry/VehicleTypeCreate";
import VehicleTypeUpdate from "./entry/VehicleTypeUpdate";
import VehicleTypeList from "./view/VehicleTypeList";

export const VehicleTypeRoute = [
  {
    id: "vehicleType-list",
    path: paths.vehicleTypeList, // Ensure this is defined in your paths constant
    element: <VehicleTypeList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Vehicle Type", url: paths.vehicleTypeList },
        ],
      };
    },
  },
  {
    id: "vehicleType-new",
    path: paths.vehicleTypeCreate, // Ensure this is defined in your paths constant
    element: <VehicleTypeCreate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Vehicle Type", url: paths.vehicleTypeList },
          { label: "Create", url: paths.vehicleTypeCreate },
        ],
      };
    },
  },
  {
    id: "vehicleType-detail",
    path: paths.vehicleTypeUpdate, // Ensure this is defined in your paths constant
    element: <VehicleTypeUpdate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Vehicle Type", url: paths.vehicleTypeList },
          { label: "Update", url: paths.vehicleTypeUpdate },
        ],
      };
    },
  },
];
