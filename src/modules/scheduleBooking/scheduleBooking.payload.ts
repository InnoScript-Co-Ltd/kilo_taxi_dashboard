import { paginateOptions } from "../../constants/config";
import { z } from "zod";
import { CUSTOMER } from "../customer/customer.payload";
import { DRIVER } from "../driver/driver.payload";

export const scheduleBookingSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  customerId: z.number().min(1, { message: "Customer ID is required" }),
  driverId: z.number().min(1, { message: "Driver ID is required" }),
  pickUpLat: z.string(),
  pickUpLong: z.string(),
  pickUpLocation: z.string(),
  destinationLocation: z.string(),
  destinationLat: z.string(),
  destinationLong: z.string(),
  walletId: z.number(),
  scheduleTime: z.date().nullable(),
  orderType: z.number(),
  status: z.number(),
});

export type ScheduleBookingFormInputs = z.infer<typeof scheduleBookingSchema>;

/**
 * Interface representing the shape of a schedule object.
 */
export interface SCHEDULE {
  id: string;
  totalAmount: number;
  estimatedAmount: number;
  status: string;
  pickUpLocation: string;
  pickUpLat: string;
  pickUpLong: string;
  destinationLocation: string;
  destinationLat: string;
  destinationLong: string;
  orderType: string;
  createdDate: string;
  walletId: number;
  walletTransactionId: number;
  customerId: number;
  driverId: number;
  scheduleTime: Date | null | string;
  scheduleBookingId: number;
  customer: CUSTOMER[]; // Use the CUSTOMER interface as an array
  driver: DRIVER[]; // Use the DRIVER interface as an array
  action: any;
  orderRouteInfo: Array<any>;
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
  format?: (value: any) => string | number | object | null; // Allow object return type
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
    id: "id",
    label: "Order Id",
    minWidth: 100,
    maxWidth: 250,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "customer",
    label: "Customer",
    minWidth: 50,
    maxWidth: 50,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "driver",
    label: "Driver",
    minWidth: 50,
    maxWidth: 50,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "pickUpLocation",
    label: "From",
    minWidth: 100,
    maxWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "destinationLocation",
    label: "To",
    minWidth: 100,
    maxWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "scheduleTime",
    label: "Schedule DateTime",
    minWidth: 100,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    maxWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "orderType",
    label: "Type",
    minWidth: 100,
    maxWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "createdDate",
    label: "Request Datetime",
    minWidth: 100,
    maxWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },

  {
    id: "action",
    label: "Action",
    minWidth: 200,
    maxWidth: 300,
    numeric: false,
    disablePadding: false,
    sort: false,
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
