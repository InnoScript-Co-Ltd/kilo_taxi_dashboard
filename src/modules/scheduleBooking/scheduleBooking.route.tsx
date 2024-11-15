import { paths } from "../../constants/paths"; // Ensure this path is correct
import ScheduleBookingCreate from "./entry/ScheduleBookingCreate"; // Adjust the import path as necessary
import ScheduleBookingUpdate from "./entry/ScheduleBookingUpdate"; // Adjust the import path as necessary
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
        id: "schedule-new",
        path: paths.scheduleBookingCreate, // Ensure this is defined in your paths constant
        element: <ScheduleBookingCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Schedule", url: paths.scheduleBookingList },
                    { label: "Create", url: paths.scheduleBookingCreate },
                ],
            };
        },
    },
    {
        id: "schedule-detail",
        path: paths.scheduleBookingDetail, // Ensure this is defined in your paths constant
        element: <ScheduleBookingUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Schedule", url: paths.scheduleBookingList },
                ],
            };
        },
    },
];
