import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

// Define Wallet Schema
export const paymentChannelSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  channelName: z
    .string()
    .min(2, { message: "Channel name must be at least 2 characters long" }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters long" }),
});

export type PaymentChannelFormInputs = z.infer<typeof paymentChannelSchema>;

/**
 * Interface representing the shape of a wallet object.
 */
export interface PAYMENTCHANNEL {
  id: string;
  channelName: string;
  description: string;
}

// Define columns for wallet table
interface PaymentChannelColumn {
  id: "id" | "channelName" | "description" | "action";
  label: string;
  minWidth?: number;
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
    id: "channelName",
    label: "Channel Name",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "description",
    label: "Description",
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
export const paymentChannelPayload: PaymentChannel_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "channelName",
    SortDir: 0,
    SearchTerm: "",
  },
};
