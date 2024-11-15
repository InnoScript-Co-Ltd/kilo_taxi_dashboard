import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

// Define Wallet Schema
export const walletSchema = z.object({
  userName: z.string().min(2, { message: "User Name must be at least 2 characters long" }),
  phoneNo: z.string().min(10, { message: "Phone number must be at least 10 digits long" }),
  email: z.string().email({ message: "Invalid email address" }),
  balance: z.string(),
  walletType: z.string(),
  status: z.string(),
  auditColumn: z.string().optional(),
  customerId: z.string().optional(),
  driverId: z.string().optional(),
});

export type WalletFormInputs = z.infer<typeof walletSchema>;

/**
 * Interface representing the shape of a wallet object.
 */
export interface WALLET {
  id: string;
  userName: string;
  phoneNo: string;
  email: string;
  balance: string;
  walletType: string;
  status: string;
  auditColumn: string;
  customerId: string;
  driverId: string;
}

// Define columns for wallet table
interface WalletColumn {
  id: "id" | "userName" | "phoneNo" | "email" | "balance" | "auditColumn" | "walletType" | "status" | "customerId" | "driverId" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: number) => string;
}

// Define Wallet Payload
export interface WALLET_PAYLOAD {
  pagingParams: {
    PageSize: number;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

export const walletColumns: readonly WalletColumn[] = [
    { id: "userName", label: "User Name", minWidth: 130, numeric: false, disablePadding: false, sort: true },
    { id: "phoneNo", label: "Phone Number", minWidth: 125, numeric: false, disablePadding: false, sort: true },
    { id: "email", label: "Email", minWidth: 200, numeric: false, disablePadding: false, sort: true },
    { id: "balance", label: "Balance", minWidth: 100, numeric: true, disablePadding: false, sort: true },
    { id: "auditColumn", label: "Audit Column", minWidth: 130, numeric: false, disablePadding: false, sort: false },
    { id: "walletType", label: "Wallet Type", minWidth: 110, numeric: false, disablePadding: false, sort: false },
    { id: "status", label: "Status", minWidth: 90, numeric: false, disablePadding: false, sort: false },
    { id: "action", label: "Action", minWidth: 60, numeric: false, disablePadding: false, sort: false },
  ];

// Wallet payload example
export const walletPayload: WALLET_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "userName",
    SortDir: 0,
    SearchTerm: "",
  },
};
