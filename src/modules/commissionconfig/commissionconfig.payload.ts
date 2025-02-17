import { paginateOptions } from "../../constants/config";
import { z } from "zod";

export const commissionConfigSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  commissionRate: z.number(),
});

export type CommissionConfigFormInputs = z.infer<typeof commissionConfigSchema>;

/**
 * Interface representing the shape of a sms object.
 */
export interface COMMISSIONCONFIG {
  id: string;
  commissionRate: number;
  createdDate: Date;
  updatedDate: Date;
  action?: null;
}

type CommissionConfigColumnId = keyof COMMISSIONCONFIG;

// Define columns for state table
interface CommissionConfig_Column {
  id: CommissionConfigColumnId;
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
export interface COMMISSIONCONFIG_PAYLOAD {
  pagingParams: {
    PageSize: number | string;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

// Define columns structure for the state table
export const commissionConfigColumns: readonly CommissionConfig_Column[] = [
  {
    id: "commissionRate",
    label: "Commission Rate",
    minWidth: 100,
    maxWidth: 200,
    numeric: true,
    disablePadding: false,
    sort: true,
  },
  {
    id: "createdDate",
    label: "Created Date",
    minWidth: 100,
    maxWidth: 200,
    numeric: true,
    disablePadding: false,
    sort: true,
  },
  {
    id: "updatedDate",
    label: "Updated Date",
    minWidth: 100,
    maxWidth: 200,
    numeric: true,
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
  },
];

// State payload example
export const commissionConfigPayload: COMMISSIONCONFIG_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "id",
    SortDir: 0,
    SearchTerm: "",
  },
};
