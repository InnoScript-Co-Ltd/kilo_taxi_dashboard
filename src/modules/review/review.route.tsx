import { paths } from "../../constants/paths"; // Ensure this path is correct
import ReviewCreate from "./entry/ReviewCreate";
import ReviewUpdate from "./entry/ReviewUpdate";
import ReviewList from "./view/ReviewList";

export const ReviewRoute = [
  {
    id: "review-list",
    path: paths.reviewList, // Ensure this is defined in your paths constant
    element: <ReviewList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Review", url: paths.reviewList },
        ],
      };
    },
  },
  {
    id: "review-new",
    path: paths.reviewCreate, // Ensure this is defined in your paths constant
    element: <ReviewCreate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Review", url: paths.reviewList },
          { label: "Create", url: paths.reviewCreate },
        ],
      };
    },
  },
  {
    id: "review-detail",
    path: paths.reviewDetail, // Ensure this is defined in your paths constant
    element: <ReviewUpdate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Review", url: paths.reviewList },
        ],
      };
    },
  },
];
