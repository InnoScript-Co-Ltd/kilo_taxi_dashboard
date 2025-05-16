import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here
import { DRIVER } from "../driver/driver.payload";
import { ADMIN } from "../admin/admin.payload";

// Define Wallet Schema
export const withDrawtransactionSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  amount: z
    .number()
    .min(2, { message: "wallet Name must be at least 2 characters long" }),
  transactionDate: z.date().nullable(),
  transactionScreenShoot: z.string(),
  file_transactionScreenShoot: z.any().nullable(),
  driverId: z.number().min(0, { message: "Driver id is required" }).default(0),
  adminId: z.number().min(0, { message: "id" }).default(0),
  status: z.number(),
});
export const withDrawtransactionCreateSchema = z.object({
  amount: z
    .number()
    .min(2, { message: "amount must be at least 2 characters long" }),
  driverId: z.number().min(0, { message: "Driver id is required" }).default(0),
  phoneNumber: z
    .string()
    .min(8, { message: "phone number is at least 8 digit" }),
  driverName: z.string().min(1, { message: "Driver Name is required" }),
  walletBalance: z
    .number()
    .min(0, { message: "Wallet balance cannot be negative" })
    .max(9999999.99, { message: "Wallet balance must not exceed 9999999.99" }),
});

export type WithDrawTransactionFormInputs = z.infer<
  typeof withDrawtransactionSchema
>;
export type WithDrawTransactionCreateFormInputs = z.infer<
  typeof withDrawtransactionCreateSchema
>;

/**
 * Interface representing the shape of a wallet object.
 */
export interface WITHDRAWTRANSACTION {
  id: string;
  amount: number;
  transactionDate: Date;
  updateDate?: Date;
  transactionScreenShoot?: string;
  file_transactionScreenShoot: string;
  status: number;
  driverInfoDto: DRIVER;
  adminInfoDto: ADMIN;
}

// Define columns for wallet table
interface WithDrawTransactionColumn {
  id:
    | "id"
    | "amount"
    | "driverInfoDto"
    | "adminInfoDto"
    | "transactionDate"
    | "updatedDate"
    | "status"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: any) => string | number | object | null | any;
}

// Define Wallet Payload
export interface WITHDRAWTRANSACTION_PAYLOAD {
  pagingParams: {
    PageSize: number;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

export const withDrawTransactionColumns: readonly WithDrawTransactionColumn[] =
  [
    {
      id: "id",
      label: "ID",
      minWidth: 130,
      numeric: false,
      disablePadding: false,
      sort: true,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 130,
      numeric: false,
      disablePadding: false,
      sort: true,
    },
    {
      id: "driverInfoDto",
      label: "Driver Name",
      minWidth: 130,
      numeric: false,
      disablePadding: false,
      sort: true,
    },
    {
      id: "adminInfoDto",
      label: "Admin Name",
      minWidth: 125,
      numeric: false,
      disablePadding: false,
      sort: true,
    },
    {
      id: "transactionDate",
      label: "Transaction Date",
      minWidth: 125,
      numeric: false,
      disablePadding: false,
      sort: true,
    },
    {
      id: "updatedDate",
      label: "Update Date",
      minWidth: 125,
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
      id: "action",
      label: "Action",
      minWidth: 60,
      numeric: false,
      disablePadding: false,
      sort: false,
    },
  ];

// Wallet payload example
export const withDrawTransactionPayload: WITHDRAWTRANSACTION_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "id",
    SortDir: 0,
    SearchTerm: "",
  },
};
