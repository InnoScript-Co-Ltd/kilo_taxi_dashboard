import { paths } from "../../constants/paths"; // Ensure this path is correct
import OrderCreate from "./entry/OrderCreate";

export const SimulationRoute = [
  {
    id: "order-new",
    path: paths.simulationOrderCreate,
    element: <OrderCreate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Order", url: paths.orderList },
          { label: "List", url: paths.simulationOrderCreate },
        ],
      };
    },
  },
];
