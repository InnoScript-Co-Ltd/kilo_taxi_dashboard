import { paths } from "../../constants/paths"; // Ensure this path is correct
import VehicleUpdate from "./entry/VehicleUpdate"; // Adjust the import path as necessary
import VehicleList from "./view/VehicleList"; // Adjust the import path as necessary

export const VehicleRoute = [
    {
        id: "vehicle-list",
        path: paths.vehicleList, // Ensure this is defined in your paths constant
        element: <VehicleList />, // This is where your vehicle table or list component will be rendered
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Vehicles", url: paths.vehicleList },
                ],
            };
        },
    },
    {
        id: "vehicle-detail",
        path: paths.vehicleDetail, // Ensure this is defined in your paths constant
        element: <VehicleUpdate />, // This is where users can view or edit a specific vehicle's details
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Vehicles", url: paths.vehicleList },
                ],
            };
        },
    },
];
