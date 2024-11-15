import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import { NotFound } from "./layouts/default/pages/NotFound";
import BlankTemplate from "./layouts/default/pages/BlankTemplate";
import { CountryRoute } from "./modules/country/country.route";
import { StateRoute } from "./modules/state/state.route";
import { DashboardRoute } from "./modules/dashboard/dashboard.route";
import { AdminRoute } from "./modules/admin/admin.route";
import { CustomerRoute } from "./modules/customer/customer.route";
import { PromotionRoute } from "./modules/promotion/promotion.route";
import { ScheduleBookingRoute } from "./modules/scheduleBooking/scheduleBooking.route";


export const routers = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <NotFound />,
        children: [
            ...DashboardRoute,
            ...CountryRoute,
            ...StateRoute,
            ...AdminRoute,
            ...CustomerRoute,
            ...PromotionRoute,
            ...ScheduleBookingRoute
        ]
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
        ]
    }
])