import { paths } from "../../constants/paths"; // Ensure this path is correct
import RoleCreate from "./entry/RoleCreate"; // Adjust the import path as necessary
import RoleUpdate from "./entry/RoleUpdate"; // Adjust the import path as necessary
import RoleList from "./view/RoleList"; // Adjust the import path as necessary

export const RoleRoute = [
  {
    id: "role-list",
    path: paths.roleList, // Ensure this is defined in your paths constant
    element: <RoleList />, // This is where your wallet table or list component will be rendered
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Role", url: paths.roleList },
        ],
      };
    },
  },
  {
    id: "role-new",
    path: paths.roleCreate, // Ensure this is defined in your paths constant
    element: <RoleCreate />, // This is the page where users can create a new wallet
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Role", url: paths.roleList },
          { label: "Create", url: paths.roleCreate },
        ],
      };
    },
  },
  {
    id: "role-detail",
    path: paths.roleDetail, // Ensure this is defined in your paths constant
    element: <RoleUpdate />, // This is where users can view or edit a specific wallet's details
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Role", url: paths.roleList },
        ],
      };
    },
  },
];
