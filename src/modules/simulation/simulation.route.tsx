import { paths } from "../../constants/paths"; // Ensure this path is correct
import OrderCreate from "./entry/OrderCreate";
import OrderMap from "./entry/OrderMap";

export const SimulationRoute = [
  {
    id: "order-new",
    path: paths.simulationOrderCreate,
    element: <OrderCreate />,
  },

  {
    id: "order-map",
    path: paths.simulationOrderMap,
    element: <OrderMap />,
  },
];
