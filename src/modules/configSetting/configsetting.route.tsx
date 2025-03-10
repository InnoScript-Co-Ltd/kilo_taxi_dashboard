import { paths } from "../../constants/paths"; // Ensure this path is correct
import ConfigSettingUpdate from "./entry/ConfigSettingUpdate";
import ConfigSettingList from "./view/ConfigSettingList";

export const ConfigSettingRoute = [
  {
    id: "configsetting-list",
    path: paths.configSettingList, // Ensure this is defined in your paths constant
    element: <ConfigSettingList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "ConfigSetting", url: paths.configSettingList },
        ],
      };
    },
  },
  {
    id: "configSetting-detail",
    path: paths.configSettingDetail, // Ensure this is defined in your paths constant
    element: <ConfigSettingUpdate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "ConfigSetting", url: paths.configSettingList },
        ],
      };
    },
  },
];
