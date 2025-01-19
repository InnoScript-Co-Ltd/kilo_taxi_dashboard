import { paginateOptions } from "../../constants/config";
import { z } from "zod";
import { CUSTOMER } from "../customer/customer.payload";
import { DRIVER } from "../driver/driver.payload";
import { SCHEDULE } from "../scheduleBooking/scheduleBooking.payload";

export const orderSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  TotalAmount: z
    .number()
    .min(1, { message: "Total Amount must be at least 1 characters long" }),
  Status: z.number(),
  CreatedDate: z.date(),
  WalletTransactionId: z
    .number()
    .min(1, { message: "Wallet Transaction ID is required" }),
  CustomerId: z.number().min(1, { message: "Customer ID is required" }),
  DriverId: z.number().min(1, { message: "Driver ID is required" }),
  ScheduleBookingId: z
    .number()
    .min(1, { message: "Schedule Booking ID is required" }),
});

export type OrderFormInputs = z.infer<typeof orderSchema>;

/**
 * Interface representing the shape of a country object.
 */
export interface ORDER {
  id: string;
  totalAmount: number;
  status: number;
  pickUpLocation: string;
  destinationLocation: string;
  type: string;
  createdDate: string;
  walletTransactionId: number;
  customerId: number;
  driverId: number;
  scheduleBookingId: number;
  customer: CUSTOMER[]; // Use the CUSTOMER interface as an array
  driver: DRIVER[]; // Use the DRIVER interface as an array
  schedule: SCHEDULE[]; // Use the DRIVER interface as an array
  action: any;
}

type OrderColumnId = keyof ORDER;

/**
 * Represents the structure of a column in the country table.
 */
export interface Order_Column {
  /** Unique identifier for the column */
  id: OrderColumnId;
  /** Label to be displayed for the column */
  label: string;
  /** Minimum width of the column */
  minWidth?: number;
  /** Maximum width of the column */
  maxWidth?: number;
  /** Alignment of the column content */
  align?: "right";
  /** Specifies if the column data is numeric */
  numeric: boolean;
  /** Specifies if padding should be disabled for the column */
  disablePadding: boolean;
  /** Optional function to format the value in the column */
  sort: boolean;
  /** Optional function to format the value in the column */
  format?: (value: number) => string;
}

/**
 * Payload structure for creating and updating a country,
 * as well as pagination parameters.
 */
export interface ORDER_PAYLOAD {
  /** Parameters for paging and sorting */
  pagingParams: {
    PageSize: number | string;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

/**
 * An array of columns for displaying the country table.
 */
export const orderColumns: readonly Order_Column[] = [
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
    id: "type",
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
/**
 * Default payload object for country operations.
 */
export const orderPayload: ORDER_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "id",
    SortDir: 0,
    SearchTerm: "",
  },
};
