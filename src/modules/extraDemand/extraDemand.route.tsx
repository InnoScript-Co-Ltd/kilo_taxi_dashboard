import { paths } from "../../constants/paths"; // Ensure this path is correct
import ExtraDemandList from "./view/ExtraDemandList";


export const ExtraDemandRoute = [
  {
    id: "extraDemand-list",
    path: paths.extraDemandList, // Ensure this is defined in your paths constant
    element: <ExtraDemandList />, // This is where your extraDemand table or list component will be rendered
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "ExtraDemands", url: paths.extraDemandList },
        ],
      };
    },
  },
  // {
  //   id: "extraDemand-detail",
  //   path: paths.extraDemandDetail, // Ensure this is defined in your paths constant
  //   element: <ExtraDemandDetail />,
  //   loader: () => {
  //     return {
  //       breadcrumbs: [
  //         { label: "Dashboard", url: paths.dashboard },
  //         { label: "ExtraDemands", url: paths.extraDemandList },
  //         { label: "Detail", url: paths.extraDemandDetail },
  //       ],
  //     };
  //   },
  // },
];
