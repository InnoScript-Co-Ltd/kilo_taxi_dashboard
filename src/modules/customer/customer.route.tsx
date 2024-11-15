import { paths } from "../../constants/paths"
import CustomerCreate from "./entry/CustomerCreate"
import CustomerUpdate from "./entry/CustomerUpdate"
import CustomerList from "./view/CustomerList"


export const CustomerRoute = [
    {
        id: "customer-list",
        path: paths.customerList,
        element: <CustomerList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Customer", url: paths.customerList },
                ],
            }
        },
        
    },
    {
        id: "customer-new",
        path: paths.customerCreate,
        element: <CustomerCreate />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Customer", url: paths.customerList },
                    { label: "Create", url: paths.customerCreate }
                ],
            }
        },
        
    },
    {
        id: "customer-detail",
        path: paths.customerDetail,
        element: <CustomerUpdate />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Customer", url: paths.customerList },
                ],
            }
        },
        
    },
]