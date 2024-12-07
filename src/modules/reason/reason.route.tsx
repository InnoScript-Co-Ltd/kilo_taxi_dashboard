import { paths } from "../../constants/paths"; // Ensure this path is correct
import ReasonCreate from "./entry/ReasonCreate"; // Adjust the import path as necessary
import ReasonUpdate from "./entry/ReasonUpdate"; // Adjust the import path as necessary
import ReasonList from "./view/ReasontList";
// Adjust the import path as necessary

export const ReasonRoute = [
    {
        id: "reason-list",
        path: paths.reasonList, // Ensure this is defined in your paths constant
        element: <ReasonList />, // This is where your reason table or list component will be rendered
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Reason", url: paths.reasonList },
                ],
            };
        },
    },
    {
        id: "reason-new",
        path: paths.reasonCreate, // Ensure this is defined in your paths constant
        element: <ReasonCreate />, // This is the page where users can create a new reason
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Reason", url: paths.reasonList },
                    { label: "Create", url: paths.reasonCreate },
                ],
            };
        },
    },
    {
        id: "reason-detail",
        path: paths.reasonDetail, // Ensure this is defined in your paths constant
        element: <ReasonUpdate />, // This is where users can view or edit a specific reason's details
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Reason", url: paths.reasonList },
                ],
            };
        },
    },
];
