import { paginateOptions } from "../../constants/config";
import { z } from "zod";

export const smsSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  MobileNumber: z.string(),
  Name: z.string(),
  Title: z.string(),
  Message: z.string(),
  Status: z.number(),
  AdminId: z.number(),
  CustomerId: z.number(),
  DriverId: z.number(),
});

export type SmsFormInputs = z.infer<typeof smsSchema>;

/**
 * Interface representing the shape of a sms object.
 */
export interface SMS {
  id: string;
  adminId: number;
  adminName: string;
  customerId: number;
  customerName: string;
  driverId: number;
  driverName: string;
  mobileNumber: string;
  name: string;
  title: string;
  message: string;
  status: number;
  action?: null;
}

type SmsColumnId = keyof SMS;

// Define columns for state table
interface Sms_Column {
  id: SmsColumnId;
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
export interface SMS_PAYLOAD {
  pagingParams: {
    PageSize: number | string;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

// Define columns structure for the state table
export const smsColumns: readonly Sms_Column[] = [
  {
    id: "name",
    label: "Name",
    minWidth: 200,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "title",
    label: "Title",
    minWidth: 100,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "mobileNumber",
    label: "Mobile Number",
    minWidth: 100,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "message",
    label: "Message",
    minWidth: 100,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "adminName",
    label: "Admin Name",
    minWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "customerName",
    label: "Customer Name",
    minWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "driverName",
    label: "Driver Name",
    minWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: false,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: false,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
  },
];

// State payload example
export const smsPayload: SMS_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: 0,
    SearchTerm: "",
  },
};
