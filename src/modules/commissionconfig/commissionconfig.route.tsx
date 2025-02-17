import { paths } from "../../constants/paths"; // Ensure this path is correct
import CommissionConfigUpdate from "./entry/CommissionConfigUpdate";
import CommissionConfigList from "./view/CommissionConfigList";

export const CommissionConfigRoute = [
  {
    id: "commissionconfig-list",
    path: paths.commissionConfigList, // Ensure this is defined in your paths constant
    element: <CommissionConfigList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "CommissionConfig", url: paths.commissionConfigList },
        ],
      };
    },
  },
  {
    id: "commissionconfig-detail",
    path: paths.commissionConfigDetail, // Ensure this is defined in your paths constant
    element: <CommissionConfigUpdate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "CommissionConfig", url: paths.commissionConfigList },
        ],
      };
    },
  },
];
