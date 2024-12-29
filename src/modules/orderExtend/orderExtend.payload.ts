import { paginateOptions } from "../../constants/config";
import { z } from "zod";
import { ORDER } from "../order/order.payload";

export const orderExtendSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  destinationLocation: z.string(),
  destinationLat: z.string(),
  destinationLong: z.string(),
  OrderId: z.number().min(1, { message: "Order ID is required" }),
  CreatedDate: z.date(),
});

export type OrderFormInputs = z.infer<typeof orderExtendSchema>;

/**
 * Interface representing the shape of a country object.
 */
export interface ORDER_EXTEND {
  id: string;
  destinationLocation: string;
  destinationLat: string;
  destinationLong: string;
  createdDate: string;
  orderId: ORDER[]; // Use the SCHEDULE interface as an array
  action: any;
}

type OrderColumnId = keyof ORDER_EXTEND;

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
export interface ORDER_EXTEND_PAYLOAD {
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
export const orderExtendColumns: readonly Order_Column[] = [
  {
    id: "destinationLocation",
    label: "Destination Location",
    minWidth: 100,
    maxWidth: 250,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "destinationLat",
    label: "Destination Lat",
    minWidth: 100,
    maxWidth: 250,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "destinationLong",
    label: "destination Long",
    minWidth: 50,
    maxWidth: 50,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "createdDate",
    label: "Created Date",
    minWidth: 100,
    maxWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "orderId",
    label: "Order",
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
export const orderExtendPayload: ORDER_EXTEND_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "id",
    SortDir: 0,
    SearchTerm: "",
  },
};
