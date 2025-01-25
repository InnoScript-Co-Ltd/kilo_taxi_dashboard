import { paths } from "../../constants/paths"; // Ensure this path is correct
import KiloAmountUpdate from "./entry/KiloAmountUpdate";
import KiloAmountList from "./view/KiloAmountList";

export const KiloAmountRoute = [
  {
    id: "kiloamount-list",
    path: paths.kiloAmountList, // Ensure this is defined in your paths constant
    element: <KiloAmountList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "KiloAmount", url: paths.kiloAmountList },
        ],
      };
    },
  },
  {
    id: "kiloamount-detail",
    path: paths.kiloAmountDetail, // Ensure this is defined in your paths constant
    element: <KiloAmountUpdate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "KiloAmount", url: paths.kiloAmountList },
        ],
      };
    },
  },
];
