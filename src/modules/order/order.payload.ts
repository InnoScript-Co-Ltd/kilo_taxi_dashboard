import { paginateOptions } from "../../constants/config";
import { z } from "zod";
import { CUSTOMER } from "../customer/customer.payload";
import { DRIVER } from "../driver/driver.payload";
import { SCHEDULE } from "../scheduleBooking/scheduleBooking.payload";
import { ExtraDemand } from "../extraDemand/extraDemand.payload";

// Updated schema with new fields and consistent key names
export const orderSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  totalAmount: z
    .number()
    .min(1, { message: "Total Amount must be at least 1 characters long" })
    .optional(),
  status: z.number(),
  createdDate: z.date().optional(),
  walletTransactionId: z
    .number()
    .min(1, { message: "Wallet Transaction ID is required" })
    .optional(),
  customerId: z.number().min(1, { message: "Customer ID is required" }),
  driverId: z.number().min(1, { message: "Driver ID is required" }).optional(),
  scheduleBookingId: z
    .number()
    .min(1, { message: "Schedule Booking ID is required" })
    .optional(),
  // New fields
  pickUpLocation: z
    .string()
    .min(1, { message: "Pick Up Location is required" }),
  destinationLocation: z
    .string()
    .min(1, { message: "Destination Location is required" }),
  orderType: z.string().min(1, { message: "Order Type is required" }),
  walletId: z.number().min(1, { message: "Wallet is required" }),
  // Existing latitude/longitude fields
  pickUpLat: z.string(),
  pickUpLong: z.string(),
  destinationLat: z.string(),
  destinationLong: z.string(),
});

export const orderCreateSchema = z.object({
  pickUpLocation: z
    .string()
    .min(1, { message: "Pick Up Location is required" }),
  pickUpLat: z.string().min(1, { message: "Pick Up Latitude is required" }),
  pickUpLong: z.string().min(1, { message: "Pick Up Longitude is required" }),
  destinationLocation: z
    .string()
    .min(1, { message: "Destination Location is required" }),
  destinationLat: z
    .string()
    .min(1, { message: "Destination Latitude is required" }),
  destinationLong: z
    .string()
    .min(1, { message: "Destination Longitude is required" }),
  orderType: z.string().min(1, { message: "Order Type is required" }),
  walletId: z.number().min(1, { message: "Wallet ID is required" }),
  customerId: z.number().min(1, { message: "Customer ID is required" }),
  status: z.number(),
});

export type OrderFormInputs = z.infer<typeof orderCreateSchema>;

/**
 * Interface representing the shape of an order object.
 */
export interface ORDER {
  id: string;
  totalAmount: number;
  estimatedAmount: number;
  status: number;
  pickUpLocation: string;
  pickUpLat: string;
  pickUpLong: string;
  destinationLocation: string;
  destinationLat: string;
  destinationLong: string;
  orderType: string;
  createdDate: string;
  walletTransactionId: number;
  walletId: number;
  customerId: number;
  driverId: number;
  scheduleBookingId: number;
  customer: CUSTOMER[]; // Use the CUSTOMER interface as an array
  driver: DRIVER[]; // Use the DRIVER interface as an array
  orderExtends: ORDER_EXTENDS[]; // Use the appropriate interface as an array
  orderExtraDemands: ORDER_EXTRA_DEMANDS[]; // Use the appropriate interface as an array
  action: any;
  orderRouteInfo: Array<any>;
}

type OrderColumnId = keyof ORDER;

export interface ORDER_EXTENDS {
  id: string;
  DestinationLocation: string;
  DestinationLat: string;
  DestinationLong: string;
  CreateDate: string;
}

export interface ORDER_EXTRA_DEMANDS {
  id: string;
  ExtraDemands: ExtraDemand[];
  Unit: string;
}

/**
 * Represents the structure of a column in the order table.
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
  /** Indicates whether the column is sortable */
  sort: boolean;
  /** Optional function to format the value in the column */
  format?: (value: number) => string;
}

/**
 * Payload structure for creating and updating orders,
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
 * An array of columns for displaying the order table.
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

/**
 * Default payload object for order operations.
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
