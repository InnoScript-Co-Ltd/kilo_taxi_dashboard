import { paginateOptions } from "../../constants/config";
// export const orderSchema = z.object({
//   id: z.number().min(0, { message: "id" }).default(0),
//   TotalAmount: z
//     .number()
//     .min(1, { message: "Total Amount must be at least 1 characters long" }),
//   Status: z.number(),
//   CreatedDate: z.date(),
//   WalletTransactionId: z
//     .number()
//     .min(1, { message: "Wallet Transaction ID is required" }),
//   CustomerId: z.number().min(1, { message: "Customer ID is required" }),
//   DriverId: z.number().min(1, { message: "Driver ID is required" }),
//   ScheduleBookingId: z
//     .number()
//     .min(1, { message: "Schedule Booking ID is required" }),
// });

// export type OrderFormInputs = z.infer<typeof orderSchema>;

/**
 * Interface representing the shape of a country object.
 */
export interface DRIVERTRIP {
  orderId: number;
  totalAmount: number;
  pickUpLocation: string;
  destinationLocation: string;
  driverBalance: number;
  commission: number;
  driverName: string;
  driverPhone: string;
  action: any;
  orderRouteInfo: Array<any>;
}

type DriverTripColumnId = keyof DRIVERTRIP;

/**
 * Represents the structure of a column in the country table.
 */
export interface DriverTrip_Column {
  /** Unique identifier for the column */
  id: DriverTripColumnId;
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
export interface DRIVERTRIP_PAYLOAD {
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
export const driverTripColumns: readonly DriverTrip_Column[] = [
  {
    id: "orderId",
    label: "Order Id",
    minWidth: 100,
    maxWidth: 250,
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
    id: "driverBalance",
    label: "Current Balance",
    minWidth: 100,
    maxWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "commission",
    label: "Commission",
    minWidth: 100,
    maxWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "driverName",
    label: "Driver Name",
    minWidth: 100,
    maxWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "driverPhone",
    label: "Driver Phone",
    minWidth: 100,
    maxWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "totalAmount",
    label: "Total Amount",
    minWidth: 100,
    maxWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
];
/**
 * Default payload object for country operations.
 */
export const driverTripPayload: DRIVERTRIP_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "id",
    SortDir: 0,
    SearchTerm: "",
  },
};
