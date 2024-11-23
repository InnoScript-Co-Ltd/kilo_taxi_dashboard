import { paths } from "../../constants/paths"; // Ensure this path is correct
import WalletCreate from "./entry/WalletCreate"; // Adjust the import path as necessary
import WalletUpdate from "./entry/WalletUpdate"; // Adjust the import path as necessary
import WalletList from "./view/WalletList"; // Adjust the import path as necessary

export const WalletRoute = [
    {
        id: "wallet-list",
        path: paths.walletList, // Ensure this is defined in your paths constant
        element: <WalletList />, // This is where your wallet table or list component will be rendered
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Wallet", url: paths.walletList },
                ],
            };
        },
    },
    {
        id: "wallet-new",
        path: paths.walletCreate, // Ensure this is defined in your paths constant
        element: <WalletCreate />, // This is the page where users can create a new wallet
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Wallet", url: paths.walletList },
                    { label: "Create", url: paths.walletCreate },
                ],
            };
        },
    },
    {
        id: "wallet-detail",
        path: paths.walletDetail, // Ensure this is defined in your paths constant
        element: <WalletUpdate />, // This is where users can view or edit a specific wallet's details
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Wallet", url: paths.walletList },
                ],
            };
        },
    },
];
