import { paths } from "../../constants/paths"
import CountryCreate from "./entry/CountryCreate"
import CountryUpdate from "./entry/CountryUpdate"
import CountryList from "./view/CountryList"


export const CountryRoute = [
    {
        id: "country-list",
        path: paths.countryList,
        element: <CountryList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Country", url: paths.countryList },
                    // { label: "Create", url: paths.countryCreate }
                ],
            }
        },
        
    },
    {
        id: "country-new",
        path: paths.countryCreate,
        element: <CountryCreate />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Country", url: paths.countryList },
                    { label: "Create", url: paths.countryCreate }
                ],
            }
        },
        
    },
    {
        id: "country-detail",
        path: paths.countryDetail,
        element: <CountryUpdate />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Country", url: paths.countryList },
                ],
            }
        },
        
    },
]