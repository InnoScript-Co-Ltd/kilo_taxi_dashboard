import { paths } from "../../constants/paths"
import DashboardView from "./view/DashboardView"


export const DashboardRoute = [
    {
        id: "dashboard",
        path: paths.dashboard,
        element: <DashboardView />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                ],
            }
        },
        
    },
]