import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

// Define TopupTransaction Schema

export const topupTransactionSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  PaymentChannelId: z.number().min(1, { message: "Payment Channel is required" }),
  UserId: z.number().min(1, { message: "Payment Channel is required" }),
  Amount: z
    .number()
    .min(0.01, { message: "Amount must be at least 0.01" })
    .max(9999999.99, { message: "Amount must not exceed 9999999.99" })
    .refine((val) => /^\d{1,7}(\.\d{1,2})?$/.test(val.toString()), {
      message: "Amount must be a valid number with up to 9 digits and 2 decimal places",
    }),
  DigitalPaymentFromPhoneNumber: z.string().min(8, { message: "phone number is at least 8 digit" }),
  DigitalPaymentToPhoneNumber: z.string().min(8, { message: "phone number is at least 8 digit" }),
  PhoneNumber: z.string().min(8, { message: "phone number is at least 8 digit" }),
  Status: z.number(),
  file_TransactionScreenShoot: z.any().nullable(),
});

export type TopupTransactionFormInputs = z.infer<typeof topupTransactionSchema>;

/**
 * Interface representing the shape of a topupTransaction object.
 */
export interface TOPUPTRANSACTION {
  id: string;
  paymentChannelId?: number;
  userId?: number;
  amount: number;
  digitalPaymentFromPhoneNumber: string;
  digitalPaymentToPhoneNumber: string;
  phoneNumber: string;
  status: number;
  file_TransactionScreenShoot: string;
  action?: null;
}

type TopupTransactionId = keyof TOPUPTRANSACTION;

// Define columns for topupTransaction table
interface TopupTransactionColumn {
  id: TopupTransactionId;
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: number) => string;
}

// Define TopupTransaction Payload
export interface TOPUPTRANSACTION_PAYLOAD {
  pagingParams: {
    PageSize: number;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

export const topupTransactionColumns: readonly TopupTransactionColumn[] = [
  {
    id: "paymentChannelId",
    label: "Payment Channel",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "userId",
    label: "User",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 125,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    minWidth: 125,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "digitalPaymentFromPhoneNumber",
    label: "Digital Payment From Phone Number",
    minWidth: 125,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "digitalPaymentToPhoneNumber",
    label: "Degital Payment TO Phone Number",
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

// TopupTransaction payload example
export const topupTransactionPayload: TOPUPTRANSACTION_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "topupTransactionName",
    SortDir: 0,
    SearchTerm: "",
  },
};
