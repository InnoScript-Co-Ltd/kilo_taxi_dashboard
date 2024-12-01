import { paths } from "../../constants/paths"; // Ensure this path is correct
import ScheduleBookingDetail from "./view/ScheduleBookingDetail";
import ScheduleBookingList from "./view/ScheduleBookingList"; // Adjust the import path as necessary

export const ScheduleBookingRoute = [
  {
    id: "schedule-list",
    path: paths.scheduleBookingList, // Ensure this is defined in your paths constant
    element: <ScheduleBookingList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Schedule", url: paths.scheduleBookingList },
        ],
      };
    },
  },
  {
    id: "schedule-detail",
    path: paths.scheduleBookingDetail, // Ensure this is defined in your paths constant
    element: <ScheduleBookingDetail />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Bookings", url: paths.scheduleBookingList },
          { label: "Detail", url: paths.scheduleBookingDetail },
        ],
      };
    },
  },
];
