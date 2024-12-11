import { paginateOptions } from "../../constants/config";
import { z } from "zod";

export const promotionSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  CustomerId: z.number().nullable(),
  PromoCode: z.string(),
  ExpiredAt: z.date(),
  Value: z.string(),
  PromotionType: z.number(),
  ApplicableTo: z.number(),
  Status: z.number().nullable(),
});

export type PromotionFormInputs = z.infer<typeof promotionSchema>;

/**
 * Interface representing the shape of a promotion object.
 */
export interface PROMOTION {
  id: string;
  customerId?: number;
  customerName: string;
  promoCode: string;
  expiredAt: null | Date;
  value: string;
  promotionType: string;
  applicableTo: string;
  status: number;
  action?: null;
}

type PromotionColumnId = keyof PROMOTION;

// Define columns for state table
interface Promotion_Column {
  id: PromotionColumnId;
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
export interface PROMOTION_PAYLOAD {
  pagingParams: {
    PageSize: number | string;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

// Define columns structure for the state table
export const promotionColumns: readonly Promotion_Column[] = [
  {
    id: "promoCode",
    label: "Promo Code",
    minWidth: 170,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "expiredAt",
    label: "Expired At",
    minWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "value",
    label: "Value",
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
    sort: false,
  },
  {
    id: "promotionType",
    label: "Promotion Type",
    minWidth: 100,
    numeric: false,
    disablePadding: false,
    sort: false,
  },
  {
    id: "applicableTo",
    label: "Applicable To",
    minWidth: 100,
    numeric: false,
    disablePadding: false,
    sort: false,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
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
export const promotionPayload: PROMOTION_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "id",
    SortDir: 0,
    SearchTerm: "",
  },
};
