import { paths } from "../../constants/paths"; // Ensure this path is correct
import TestList from "./view/TestList";

export const TestRoute = [
  {
    id: "test-list",
    path: paths.testList, // Ensure this is defined in your paths constant
    element: <TestList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Test", url: paths.testList },
        ],
      };
    },
  },
];
