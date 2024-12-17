import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

// Define Reason Schema
export const reasonSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  status: z.number(),
});

export type ReasonFormInputs = z.infer<typeof reasonSchema>;

/**
 * Interface representing the shape of a reason object.
 */
export interface REASON {
  id: string;
  name: string;
  status: number;
}

// Define columns for reason table
interface ReasonColumn {
  id: "id" | "name" | "status" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: number) => string;
}

// Define Reason Payload
export interface REASON_PAYLOAD {
  pagingParams: {
    PageSize: number;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

export const reasonColumns: readonly ReasonColumn[] = [
  {
    id: "name",
    label: "Name",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  { 
    id: "status", 
    label: "Status", 
    minWidth: 50, 
    numeric: false, 
    disablePadding: false, 
    sort: true 
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

// Reason payload example
export const reasonPayload: REASON_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: 0,
    SearchTerm: "",
  },
};
