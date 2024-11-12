import { paths } from "../../constants/paths"; // Ensure this path is correct
import StateCreate from "./entry/StateCreate"; // Adjust the import path as necessary
import StateUpdate from "./entry/StateUpdate"; // Adjust the import path as necessary
import StateList from "./view/StateList"; // Adjust the import path as necessary

export const StateRoute = [
    {
        id: "state-list",
        path: paths.stateList, // Ensure this is defined in your paths constant
        element: <StateList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "State", url: paths.stateList },
                ],
            };
        },
    },
    {
        id: "state-new",
        path: paths.stateCreate, // Ensure this is defined in your paths constant
        element: <StateCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "State", url: paths.stateList },
                    { label: "Create", url: paths.stateCreate },
                ],
            };
        },
    },
    {
        id: "state-detail",
        path: paths.stateDetail, // Ensure this is defined in your paths constant
        element: <StateUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "State", url: paths.stateList },
                ],
            };
        },
    },
];
