import { paginateOptions } from "../../constants/config";
import { z } from "zod";

export const extraDemandSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  title: z.string(),
  description: z.string(),
  unit: z.number(),
  amount: z
    .number()
    .min(0.01, { message: "Amount must be at least 0.01" })
    .max(9999999.99, { message: "Amount must not exceed 9999999.99" })
    .refine((val) => /^\d{1,7}(\.\d{1,2})?$/.test(val.toString()), {
      message: "Amount must be a valid number with up to 9 digits and 2 decimal places",
    }),
  CreatedDate: z.date(),
});


export type ExtraDemandFormInputs = z.infer<typeof extraDemandSchema>;

/**
 * Interface representing the shape of a country object.
 */
export interface ORDER {
  id: string;
  title: string;
  description: string;
  unit: number;
  amount: number;
  createdDate: string;
  action: any;
}

type ExtraDemandColumnId = keyof ORDER;

/**
 * Represents the structure of a column in the country table.
 */
export interface ExtraDemand_Column {
  /** Unique identifier for the column */
  id: ExtraDemandColumnId;
  /** Label to be displayed for the column */
  label: string;
  /** Minimum width of the column */
  minWidth?: number;
  /** Maximum width of the column */
  maxWidth?: number;
  /** Alignment of the column content */
  align?: "right";
  /** Specifies if the column data is numeric */
  numeric: boolean;
  /** Specifies if padding should be disabled for the column */
  disablePadding: boolean;
  /** Optional function to format the value in the column */
  sort: boolean;
  /** Optional function to format the value in the column */
  format?: (value: number) => string;
}

/**
 * Payload structure for creating and updating a country,
 * as well as pagination parameters.
 */
export interface ORDER_PAYLOAD {
  /** Parameters for paging and sorting */
  pagingParams: {
    PageSize: number | string;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

/**
 * An array of columns for displaying the country table.
 */
export const extraDemandColumns: readonly ExtraDemand_Column[] = [
  {
    id: "title",
    label: "Title",
    minWidth: 100,
    maxWidth: 250,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "description",
    label: "Description",
    minWidth: 100,
    maxWidth: 250,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "unit",
    label: "Unit",
    minWidth: 100,
    maxWidth: 250,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    maxWidth: 250,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "createdDate",
    label: "Created Date",
    minWidth: 100,
    maxWidth: 150,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 200,
    maxWidth: 300,
    numeric: false,
    disablePadding: false,
    sort: false,
  },
];
/**
 * Default payload object for country operations.
 */
export const extraDemandPayload: ORDER_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "id",
    SortDir: 0,
    SearchTerm: "",
  },
};
