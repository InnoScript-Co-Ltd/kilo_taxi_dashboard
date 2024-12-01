import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import { NotFound } from "./layouts/default/pages/NotFound";
import BlankTemplate from "./layouts/default/pages/BlankTemplate";
import { DashboardRoute } from "./modules/dashboard/dashboard.route";
import { AdminRoute } from "./modules/admin/admin.route";
import { CustomerRoute } from "./modules/customer/customer.route";
import { PromotionRoute } from "./modules/promotion/promotion.route";
import { ScheduleBookingRoute } from "./modules/scheduleBooking/scheduleBooking.route";
import { DriverRoute } from "./modules/driver/driver.route";
import { VehicleRoute } from "./modules/vehicle/vehicle.route";
import { WalletRoute } from "./modules/wallet/wallet.route";
import { OrderRoute } from "./modules/order/order.route";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <NotFound />,
    children: [
      ...DashboardRoute,
      ...AdminRoute,
      ...CustomerRoute,
      ...PromotionRoute,
      ...ScheduleBookingRoute,
      ...DriverRoute,
      ...VehicleRoute,
      ...WalletRoute,
      ...OrderRoute,
    ],
  },
  {
    path: "auth",
    element: <BlankTemplate />,
    errorElement: <NotFound />,
    children: [
      // {
      //     path: "login",
      //     element: <Login />
      // }
    ],
  },
]);
