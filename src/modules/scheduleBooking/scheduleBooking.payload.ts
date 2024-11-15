import { paginateOptions } from "../../constants/config";
import { z } from "zod";

export const scheduleBookingSchema = z.object({
  CustomerId : z.string(),
  DeliverId : z.string(),
  PickUpAddress : z.string(),
  Destination: z.string(),
  ScheduleTime: z.date(),
  Note: z.string(),
  KiloType: z.string(),
  Status: z.string()
});

export type ScheduleBookingFormInputs = z.infer<typeof scheduleBookingSchema>;

/**
 * Interface representing the shape of a promotion object.
 */
export interface SCHEDULE {
  id: string;
  customerId?: string;
  deliverId?: string;
  pickup_address: string;
  destination: string;
  schedule_time: Date | null;
  note: string;
  kilo_type: string;
  status: string;
  action?: null
}

type ScheduleColumnId = keyof SCHEDULE

// Define columns for state table
interface Column {
  id: ScheduleColumnId;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right";
  numeric: boolean,
  disablePadding: boolean,
  sort?: boolean,
  format?: (value: number) => string;
}

// Define State Payload
export interface SCHEDULE_PAYLOAD {
  pagingParams: {
    PageSize: number | string,
    CurrentPage: number,
    SortField: any,
    SortDir: any,
    SearchTerm: string
  }
}

// Define columns structure for the state table
export const scheduleColumns: readonly Column[] = [
  { id: "pickup_address", label: "Pickup Address", minWidth: 170 , numeric: false, disablePadding: false, sort: true },
  { id: "schedule_time", label: "Schedule Time", minWidth: 150, numeric: false, disablePadding: false, sort: true },
  { id: "destination", label: "Destination", minWidth: 150, numeric: false, disablePadding: false, sort: true },
  { id: "kilo_type", label: "Kilo Type", minWidth: 50, numeric: false, disablePadding: false, sort: false },
  { id: "action", label: "Action", minWidth: 50, maxWidth: 50, numeric: false, disablePadding: false }
];

// State payload example
export const schedulePayload: SCHEDULE_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "pickup_address",
    SortDir: 0,
    SearchTerm: ""
  }
};
