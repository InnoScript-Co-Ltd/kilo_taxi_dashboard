import { paginateOptions } from "../../constants/config";
import { z } from "zod";

export const kiloAmountSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  kilo: z.number(),
  amount: z.number(),
});

export type KiloAmountFormInputs = z.infer<typeof kiloAmountSchema>;

/**
 * Interface representing the shape of a sms object.
 */
export interface KILOAMOUNT {
  id: string;
  kilo: number;
  amount: number;
  action?: null;
}

type KiloAmountColumnId = keyof KILOAMOUNT;

// Define columns for state table
interface KiloAmount_Column {
  id: KiloAmountColumnId;
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
export interface KILOAMOUNT_PAYLOAD {
  pagingParams: {
    PageSize: number | string;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

// Define columns structure for the state table
export const kiloAmountColumns: readonly KiloAmount_Column[] = [
  {
    id: "kilo",
    label: "Kilo",
    minWidth: 100,
    maxWidth: 200,
    numeric: true,
    disablePadding: false,
    sort: true,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    maxWidth: 200,
    numeric: true,
    disablePadding: false,
    sort: true,
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
export const kiloAmountPayload: KILOAMOUNT_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "kilo",
    SortDir: 0,
    SearchTerm: "",
  },
};
