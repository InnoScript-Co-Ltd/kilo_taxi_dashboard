import { paths } from "../../constants/paths"; // Ensure this path is correct
import OrderExtendList from "./view/OrderExtendList";

export const OrderExtendRoute = [
  {
    id: "orderExtend-list",
    path: paths.orderExtendList, // Ensure this is defined in your paths constant
    element: <OrderExtendList />, // This is where your orderExtend table or list component will be rendered
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "OrderExtends", url: paths.orderExtendList },
        ],
      };
    },
  },
  // {
  //   id: "orderExtend-detail",
  //   path: paths.orderExtendDetail, // Ensure this is defined in your paths constant
  //   element: <OrderExtendDetail />,
  //   loader: () => {
  //     return {
  //       breadcrumbs: [
  //         { label: "Dashboard", url: paths.dashboard },
  //         { label: "OrderExtends", url: paths.orderExtendList },
  //         { label: "Detail", url: paths.orderExtendDetail },
  //       ],
  //     };
  //   },
  // },
];
