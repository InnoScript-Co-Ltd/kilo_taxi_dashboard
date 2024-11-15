import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import { NotFound } from "./layouts/default/pages/NotFound";
import BlankTemplate from "./layouts/default/pages/BlankTemplate";
import { CountryRoute } from "./modules/country/country.route";
import { StateRoute } from "./modules/state/state.route";
import { DashboardRoute } from "./modules/dashboard/dashboard.route";
import { DriverRoute } from "./modules/driver/driver.route";
import { VehicleRoute } from "./modules/vehicle/vehicle.route";
import { WalletRoute } from "./modules/wallet/wallet.route";


export const routers = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <NotFound />,
        children: [
            ...DashboardRoute,
            ...CountryRoute,
            ...StateRoute,
            ...DriverRoute,
            ...VehicleRoute,
            ...WalletRoute,
            
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