import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

// Define ExtraDemand Schema
export const extraDemandSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  title: z
    .string()
    .min(2, { message: "ExtraDemand Name must be at least 2 characters long" }),
  amount: z
    .number()
    .positive("Amount must be a positive number")
    .min(1, "Amount must be greater than or equal to 1"),
  description: z
    .string(),
});

export type ExtraDemandFormInputs = z.infer<typeof extraDemandSchema>;

/**
 * Interface representing the shape of a extraDemand object.
 */
export interface ExtraDemand {
  id: string;
  title: string;
  amount: number;
  description: string;
  createDate: Date | null;
}

// Define columns for extraDemand table
interface ExtraDemandColumn {
  id: "id" | "title" | "amount" | "description" | "createDate" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: number) => string;
}

// Define extraDemand Payload
export interface ExtraDemand_PAYLOAD {
  pagingParams: {
    PageSize: number;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

export const extraDemandColumns: readonly ExtraDemandColumn[] = [
  {
    id: "title",
    label: "Charges Name",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "description",
    label: "Description",
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
    id: "action",
    label: "Action",
    minWidth: 60,
    numeric: false,
    disablePadding: false,
    sort: false,
  },
];

// extraDemand payload example
export const extraDemandPayload: ExtraDemand_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: 0,
    SearchTerm: "",
  },
};
