import { paginateOptions } from "../../constants/config";
import { z } from "zod";

export const promotionSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  PromoCode: z.string(),
  CreatedDate: z.date(),
  ExpiredDate: z.date(),
  Quantity: z.string().nullable(),
  Unit: z.string(),
  Description: z.string(),
  PromotionType: z.number(),
  ApplicableTo: z.number(),
  Status: z.number().nullable(),
  CustomerIds: z.array(z.number()).optional(),
});

export type PromotionFormInputs = z.infer<typeof promotionSchema>;

/**
 * Interface representing the shape of a promotion object.
 */
export interface PROMOTION {
  id: string;
  promoCode: string;
  createdDate: null | Date;
  expiredDate: null | Date;
  quantity?: string;
  unit: string;
  description?: string;
  promotionType: number;
  applicableTo: number;
  status: number;
  customerIds?: number[] | null;
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
    minWidth: 100,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "createdDate",
    label: "Created Date",
    minWidth: 100,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "expiredDate",
    label: "Expired Date",
    minWidth: 100,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 100,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
    sort: false,
  },
  {
    id: "unit",
    label: "Unit",
    minWidth: 100,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
    sort: false,
  },
  {
    id: "promotionType",
    label: "Promotion Type",
    minWidth: 100,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
    sort: false,
  },
  {
    id: "applicableTo",
    label: "Applicable To",
    minWidth: 100,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
    sort: false,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    maxWidth: 200,
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
