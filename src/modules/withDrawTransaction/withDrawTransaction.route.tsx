import { paths } from "../../constants/paths"; // Ensure this path is correct
import WithDrawTransactionUpdate from "./entry/WithDrawTransactionUpdate"; // Adjust the import path as necessary
import WithDrawTransactionList from "./view/WithDrawTransactionList"; // Adjust the import path as necessary

export const WithDrawTransactionRoute = [
  {
    id: "withDrawTransaction-list",
    path: paths.withDrawTransactionList, // Ensure this is defined in your paths constant
    element: <WithDrawTransactionList />, // This is where your wallet table or list component will be rendered
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "WithDrawTransaction", url: paths.withDrawTransactionList },
        ],
      };
    },
  },
  {
    id: "withDrawTransaction-detail",
    path: paths.withDrawTransactionDetail, // Ensure this is defined in your paths constant
    element: <WithDrawTransactionUpdate />, // This is where users can view or edit a specific wallet's details
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "withDrawTransaction", url: paths.withDrawTransactionList },
        ],
      };
    },
  },
];
