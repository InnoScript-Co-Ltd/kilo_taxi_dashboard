import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

// Define Wallet Schema
export const sosSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  address: z
    .string()
    .min(2, { message: "Channel name must be at least 2 characters long" }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters long" }),
});

export type SosFormInputs = z.infer<typeof sosSchema>;

/**
 * Interface representing the shape of a wallet object.
 */
export interface Sos {
  id: string;
  address: string;
  status: string;
  walletType: string;
  reasonId: string;
}

// Define columns for wallet table
interface SosColumn {
  id: "id" | "address" | "status" | "walletType" | "reasonId" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: number) => string;
}

// Define Wallet Payload
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
    id: "address",
    label: "Address",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 125,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "walletType",
    label: "Wallet Type",
    minWidth: 125,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "reasonId",
    label: "Reason Id",
    minWidth: 60,
    numeric: false,
    disablePadding: false,
    sort: false,
  },
];

// Wallet payload example
export const sosPayload: Sos_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "address",
    SortDir: 0,
    SearchTerm: "",
  },
};
