import { paginateOptions } from "../../constants/config";
import { z } from "zod";
import { ORDER } from "../order/order.payload";

export const scheduleBookingSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  CustomerId: z.string(),
  DeliverId: z.string(),
  PickUpLocation: z.string(),
  destinationLocation: z.string(),
  ScheduleTime: z.date(),
  CreatedDate: z.date(),
  Status: z.string(),
});

export type ScheduleBookingFormInputs = z.infer<typeof scheduleBookingSchema>;

/**
 * Interface representing the shape of a schedule object.
 */
export interface SCHEDULE {
  id: string;
  customerId?: string;
  deliverId?: string;
  pickUpLocation: string;
  destinationLocation: string;
  scheduleTime: string;
  createdDate: string;
  orders: ORDER[]; // Use the order interface as an array
  status: string;
  action?: null;
}

type ScheduleColumnId = keyof SCHEDULE;

// Define columns for state table
interface Column {
  id: ScheduleColumnId;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: number) => string;
}

// Define State Payload
export interface SCHEDULE_PAYLOAD {
  pagingParams: {
    PageSize: number | string;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

// Define columns structure for the state table
export const scheduleColumns: readonly Column[] = [
  {
    id: "pickUpLocation",
    label: "Pickup Location",
    minWidth: 170,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "destinationLocation",
    label: "Drop Off Location",
    minWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "scheduleTime",
    label: "Schedule Time",
    minWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },

  {
    id: "createdDate",
    label: "Created Date",
    minWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: false,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 200,
    maxWidth: 300,
    numeric: false,
    disablePadding: false,
  },
];

// State payload example
export const schedulePayload: SCHEDULE_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "id",
    SortDir: 0,
    SearchTerm: "",
  },
};
