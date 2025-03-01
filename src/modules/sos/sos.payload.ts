import { z } from "zod";
import { format } from "date-fns";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

// Define Sos Schema
export const sosSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  userType: z.string().min(1, { message: "User type is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  lat: z.string().optional(), // Latitude is optional
  long: z.string().optional(), // Longitude is optional
  status: z.string().min(1, { message: "Status is required" }),
  driverId: z.number().min(0, { message: "Driver ID must be a positive number" }),
  driverName: z.string().optional(),
  customerId: z.number().min(0, { message: "Customer ID must be a positive number" }),
  createdDate: z.string().datetime({ message: "Invalid date format" }), // Assuming ISO string format
  updatedDate: z.string().datetime({ message: "Invalid date format" }).optional(), // Optional, as it can be null
  reasonId: z.number().min(0, { message: "Reason ID must be a positive number" }),
});

export type SosFormInputs = z.infer<typeof sosSchema>;

/**
 * Interface representing the shape of an SOS object.
 */
export interface Sos {
  id: string;
  userType: string;
  location: string;
  lat?: string;
  long?: string;
  status: string;
  driverId: number;
  driverName?: string;
  customerId: number;
  customerName?: string;
  reasonId: number;
  reasonName?: string;
  createdDate: Date;
  updatedDate?: Date;
}

// Define columns for SOS table
interface SosColumn {
  id: keyof Sos | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: number) => string;
}

// Define SOS Payload
export interface Sos_PAYLOAD {
  pagingParams: {
    PageSize: number;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

export const sosColumns: readonly SosColumn[] = [
  {
    id: "id",
    label: "Issue Id",
    minWidth: 30,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "customerName",
    label: "Customer",
    minWidth: 60,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "driverName",
    label: "Driver",
    minWidth: 60,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "reasonName",
    label: "Reason",
    minWidth: 60,
    numeric: false,
    disablePadding: false,
    sort: false,
  },
  {
    id: "location",
    label: "Location",
    minWidth: 60,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "createdDate",
    label: "Request DateTime",
    minWidth: 60,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "updatedDate",
    label: "Solved DateTime",
    minWidth: 60,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 60,
    numeric: false,
    disablePadding: false,
    sort: false,
  },
  
];

// SOS payload example
export const sosPayload: Sos_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "location",
    SortDir: 0,
    SearchTerm: "",
  },
};
