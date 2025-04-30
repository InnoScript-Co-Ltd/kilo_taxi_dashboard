import { paginateOptions } from "../../constants/config";
import { z } from "zod";

export const configSettingSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  commissionRate: z.number(),
  commissionAmount: z.number(),
  matchDistance: z.number(),
  maxMatchDistance: z.number(),
  defaultTime: z.string(),
  minute: z.number(),
  minutePerRate: z.number(),
});

export type ConfigSettingFormInputs = z.infer<typeof configSettingSchema>;

/**
 * Interface representing the shape of a sms object.
 */
export interface CONFIGSETTING {
  id: string;
  matchDistance: number;
  maxMatchDistance: number;
  defaultTime: string;
  minute: number;
  minutePerRate: number;
  commissionRate: number;
  commissionAmount: number;
  createdDate: Date;
  updatedDate: Date;
  updatedBy: string;
  action?: null;
}

type ConfigSettingColumnId = keyof CONFIGSETTING;

// Define columns for state table
interface ConfigSetting_Column {
  id: ConfigSettingColumnId;
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
export interface CONFIGSETTING_PAYLOAD {
  pagingParams: {
    PageSize: number | string;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

// Define columns structure for the state table
export const configSettingColumns: readonly ConfigSetting_Column[] = [
  {
    id: "matchDistance",
    label: "Match Distance",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "defaultTime",
    label: "Default Time",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "minute",
    label: "Minute",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "minutePerRate",
    label: "Minute Per Rate",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "maxMatchDistance",
    label: "Max Match Distance",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "commissionRate",
    label: "Commission Rate",
    minWidth: 100,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "commissionAmount",
    label: "Commission Amount",
    minWidth: 100,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "createdDate",
    label: "Created Date",
    minWidth: 100,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "updatedDate",
    label: "Updated Date",
    minWidth: 100,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "updatedBy",
    label: "Updated By",
    minWidth: 100,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    numeric: false,
    disablePadding: false,
  },
];

// State payload example
export const configSettingPayload: CONFIGSETTING_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "id",
    SortDir: 0,
    SearchTerm: "",
  },
};
