import { paths } from "../../constants/paths"; // Ensure this path is correct
import PromotionCreate from "./entry/PromotionCreate"; // Adjust the import path as necessary
import PromotionUpdate from "./entry/PromotionUpdate"; // Adjust the import path as necessary
import PromotionList from "./view/PromotionList"; // Adjust the import path as necessary

export const PromotionRoute = [
    {
        id: "promotion-list",
        path: paths.promotionList, // Ensure this is defined in your paths constant
        element: <PromotionList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Promotion", url: paths.promotionList },
                ],
            };
        },
    },
    {
        id: "promotion-new",
        path: paths.promotionCreate, // Ensure this is defined in your paths constant
        element: <PromotionCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Promotion", url: paths.promotionList },
                    { label: "Create", url: paths.promotionCreate },
                ],
            };
        },
    },
    {
        id: "promotion-detail",
        path: paths.promotionDetail, // Ensure this is defined in your paths constant
        element: <PromotionUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Promotion", url: paths.promotionList },
                ],
            };
        },
    },
];
