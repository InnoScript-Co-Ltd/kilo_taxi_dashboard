import { paths } from "../../constants/paths"; // Ensure this path is correct
import TopupTransactionCreate from "./entry/TopupTransactionCreate"; // Adjust the import path as necessary
import TopupTransactionList from "./view/TopupTransactiontList";

// Adjust the import path as necessary

export const TopupTransactionRoute = [
    {
        id: "topupTransaction-list",
        path: paths.topupTransactionList, // Ensure this is defined in your paths constant
        element: <TopupTransactionList />, // This is where your topupTransaction table or list component will be rendered
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "TopupTransaction", url: paths.topupTransactionList },
                ],
            };
        },
    },
    {
        id: "topupTransaction-new",
        path: paths.topupTransactionCreate, // Ensure this is defined in your paths constant
        element: <TopupTransactionCreate />, // This is the page where users can create a new topupTransaction
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "TopupTransaction", url: paths.topupTransactionList },
                    { label: "Create", url: paths.topupTransactionCreate },
                ],
            };
        },
    },
];
