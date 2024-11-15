import { paths } from "../../constants/paths"
import AdminCreate from "./entry/AdminCreate"
import AdminUpdate from "./entry/AdminUpdate"
import AdminList from "./view/AdminList"


export const AdminRoute = [
    {
        id: "admin-list",
        path: paths.adminList,
        element: <AdminList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Admin", url: paths.adminList },
                ],
            }
        },
        
    },
    {
        id: "admin-new",
        path: paths.adminCreate,
        element: <AdminCreate />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Admin", url: paths.adminList },
                    { label: "Create", url: paths.adminCreate }
                ],
            }
        },
        
    },
    {
        id: "admin-detail",
        path: paths.adminDetail,
        element: <AdminUpdate />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Admin", url: paths.adminList },
                ],
            }
        },
        
    },
]