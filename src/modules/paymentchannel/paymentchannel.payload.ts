import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

// Define Wallet Schema
export const paymentChannelSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  ChannelName: z.string(),
  Description: z.string(),
  PaymentType: z.number(),
  Phone: z.string().nullable().optional(), // Allow nullable or undefined
  UserName: z.string().nullable().optional(),
  file_Icon: z.any().nullable().optional(),
});

export type PaymentChannelFormInputs = z.infer<typeof paymentChannelSchema>;

/**
 * Interface representing the shape of a wallet object.
 */
export interface PAYMENTCHANNEL {
  id: string;
  channelName: string;
  description: string;
  paymentType: string;
  icon: string;
  phone?: string;
  userName?: string;
  file_Icon: string;
  action?: null;
}

type PaymentChannelColumnId = keyof PAYMENTCHANNEL;

// Define columns for wallet table
interface PaymentChannelColumn {
  id: PaymentChannelColumnId;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: number) => string;
}

// Define Wallet Payload
export interface PaymentChannel_PAYLOAD {
  pagingParams: {
    PageSize: number;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

export const paymentChannelColumns: readonly PaymentChannelColumn[] = [
  {
    id: "icon",
    label: "Icon",
    minWidth: 100,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "channelName",
    label: "Channel Name",
    minWidth: 100,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "description",
    label: "Description",
    minWidth: 100,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "paymentType",
    label: "PaymentType",
    minWidth: 100,
    maxWidth: 200,
    numeric: false,
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
    sort: false,
  },
];

// Wallet payload example
export const paymentChannelPayload: PaymentChannel_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "channelName",
    SortDir: 0,
    SearchTerm: "",
  },
};
