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
import { PaymentChannelRoute } from "./modules/paymentchannel/paymentchannel.route";
import { ReviewRoute } from "./modules/review/review.route";
import { ReasonRoute } from "./modules/reason/reason.route";
import { TopupTransactionRoute } from "./modules/topupTransaction/topupTransaction.route";
import { SmsRoute } from "./modules/sms/sms.route";
import { SimulationRoute } from "./modules/simulation/simulation.route";
import { SosRoute } from "./modules/sos/sos.route";
import { CityRoute } from "./modules/city/city.route";
import { TravelRateRoute } from "./modules/travelrate/travelrate.route";
import { VehicleTypeRoute } from "./modules/vehicleType/vehicleType.route";
import Login from "./modules/auth/view/Login";
import { ExtraDemandRoute } from "./modules/extraDemand/extraDemand.route";
import { KiloAmountRoute } from "./modules/kiloamount/kiloamount.route";
import { TownshipRoute } from "./modules/township/township.route";
import { CommissionConfigRoute } from "./modules/commissionconfig/commissionconfig.route";
export const routers = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <NotFound />,
    children: [
      // ...AuthRoute,
      ...DashboardRoute,
      ...AdminRoute,
      ...CustomerRoute,
      ...PromotionRoute,
      ...ScheduleBookingRoute,
      ...DriverRoute,
      ...VehicleRoute,
      ...VehicleTypeRoute,
      ...WalletRoute,
      ...OrderRoute,
      ...PaymentChannelRoute,
      ...ReviewRoute,
      ...ReasonRoute,
      ...TopupTransactionRoute,
      ...SmsRoute,
      ...SimulationRoute,
      ...SosRoute,
      ...CityRoute,
      ...TownshipRoute,
      ...TravelRateRoute,
      ...KiloAmountRoute,
      ...CommissionConfigRoute,
      ...ExtraDemandRoute,
    ],
  },
  {
    path: "auth",
    element: <BlankTemplate />,
    errorElement: <NotFound />,
  },
  {
    path: "auth/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
]);
