import { paginateOptions } from "../../constants/config";
import { z } from "zod";

export const promotionSchema = z.object({
  CustomerId : z.string(),
  PromoCode: z.string(),
  ExpiredAt: z.date(),
  FixAmount: z.string(),
  Percentage: z.string(),
  Status: z.string()
});

export type PromotionFormInputs = z.infer<typeof promotionSchema>;

/**
 * Interface representing the shape of a promotion object.
 */
export interface PROMOTION {
  id: string;
  countryId?: string;
  countryName: string;
  promo_code: string;
  expired_at: null | Date;
  fix_amount: string;
  percentage: string;
  status: string;
  action?: null
}

type PromotionColumnId = keyof PROMOTION

// Define columns for state table
interface Column {
  id: PromotionColumnId;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right";
  numeric: boolean,
  disablePadding: boolean,
  sort?: boolean,
  format?: (value: number) => string;
}

// Define State Payload
export interface PROMOTION_PAYLOAD {
  pagingParams: {
    PageSize: number | string,
    CurrentPage: number,
    SortField: any,
    SortDir: any,
    SearchTerm: string
  }
}

// Define columns structure for the state table
export const promotionColumns: readonly Column[] = [
  { id: "promo_code", label: "Promo Code", minWidth: 170 , numeric: false, disablePadding: false, sort: true },
  { id: "expired_at", label: "Expired At", minWidth: 150, numeric: false, disablePadding: false, sort: true },
  { id: "fix_amount", label: "Fix Amount", minWidth: 150, numeric: false, disablePadding: false, sort: true },
  { id: "countryName", label: "Country Name", minWidth: 150, numeric: false, disablePadding: false, sort: false },
  { id: "percentage", label: "Percantage", minWidth: 50, numeric: false, disablePadding: false, sort: false },
  { id: "action", label: "Action", minWidth: 50, maxWidth: 50, numeric: false, disablePadding: false }
];

// State payload example
export const promotionPayload: PROMOTION_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "promo_code",
    SortDir: 0,
    SearchTerm: ""
  }
};
