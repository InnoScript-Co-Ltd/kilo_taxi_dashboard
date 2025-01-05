import { paginateOptions } from "../../constants/config";
import { z } from "zod";

export const reviewSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  Rating: z.number().default(0),
  ReviewContent: z.string().nullable(),
  CustomerId: z.number().nullable(),
  DriverId: z.number().nullable(),
});

export type ReviewFormInputs = z.infer<typeof reviewSchema>;

/**
 * Interface representing the shape of a review object.
 */
export interface REVIEW {
  id: string;
  customerId?: number;
  customerName: string;
  driverId?: number;
  driverName: string;
  rating: number;
  reviewContent: string;
  action?: null;
}

type ReviewColumnId = keyof REVIEW;

// Define columns for state table
interface Review_Column {
  id: ReviewColumnId;
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
export interface REVIEW_PAYLOAD {
  pagingParams: {
    PageSize: number | string;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

// Define columns structure for the state table
export const reviewColumns: readonly Review_Column[] = [
  {
    id: "reviewContent",
    label: "Review Content",
    minWidth: 200,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "rating",
    label: "Rating",
    minWidth: 100,
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
    sort: true,
  },
  {
    id: "driverName",
    label: "Driver Name",
    minWidth: 150,
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
export const reviewPayload: REVIEW_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "id",
    SortDir: 0,
    SearchTerm: "",
  },
};
