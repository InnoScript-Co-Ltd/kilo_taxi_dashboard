import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

// Define Wallet Schema
export const walletSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  walletName: z
    .string()
    .min(2, { message: "wallet Name must be at least 2 characters long" }),
  kilo: z.number().min(1, { message: "kilo must be at least 1 number" }),
  downTownAmount: z
    .number()
    .min(1, { message: "downTownAmount must be at least 1 number" }),
  outTownAmount: z
    .number()
    .min(1, { message: "outTownAmount must be at least 1 number" }),
});

export type WalletFormInputs = z.infer<typeof walletSchema>;

/**
 * Interface representing the shape of a wallet object.
 */
export interface WALLET {
  id: string;
  walletName: string;
  kilo: number;
  downTownAmount: number;
  outTownAmount: number;
  createDate: Date | null;
  updateDate?: Date | null;
  updatedBy: string;
}

// Define columns for wallet table
interface WalletColumn {
  id:
    | "id"
    | "walletName"
    | "kilo"
    | "downTownAmount"
    | "outTownAmount"
    | "createDate"
    | "updateDate"
    | "updatedBy"
    | "action";
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
  {
    id: "walletName",
    label: "Wallet Name",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "kilo",
    label: "Kilo",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "downTownAmount",
    label: "DownTown Amount",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "outTownAmount",
    label: "OutTown Amount",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "createDate",
    label: "Create Date",
    minWidth: 125,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "updateDate",
    label: "Update Date",
    minWidth: 125,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "updatedBy",
    label: "Update By",
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
export const walletPayload: WALLET_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "walletName",
    SortDir: 0,
    SearchTerm: "",
  },
};
