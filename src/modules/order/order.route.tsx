import { paths } from "../../constants/paths"; // Ensure this path is correct
import OrderDetail from "./view/OrderDetail";
import OrderList from "./view/OrderList";

export const OrderRoute = [
  {
    id: "order-list",
    path: paths.orderList, // Ensure this is defined in your paths constant
    element: <OrderList />, // This is where your order table or list component will be rendered
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Orders", url: paths.orderList },
        ],
      };
    },
  },
  {
    id: "order-detail",
    path: paths.orderDetail, // Ensure this is defined in your paths constant
    element: <OrderDetail />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Orders", url: paths.orderList },
          { label: "Detail", url: paths.orderDetail },
        ],
      };
    },
  },
];
