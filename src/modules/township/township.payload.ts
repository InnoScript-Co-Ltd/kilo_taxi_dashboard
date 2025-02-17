import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

export const townshipSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  name: z
    .string()
    .min(2, { message: "Township Name must be at least 2 characters long" }),
  status: z.number(),
});

export const townshipUpdateSchema = z.object({
  Name: z
    .string()
    .min(0, { message: "Township Name must be at least 2 characters long" }),
  Status: z.string(),
});

export const townshipCreateSchema = z.object({
  Name: z
    .string()
    .min(0, { message: "Township Name must be at least 2 characters long" }),
  Status: z.string(),
});

export type TownshipFormInputs = z.infer<typeof townshipSchema>;
export type TownshipUpdateFormInputs = z.infer<typeof townshipUpdateSchema>;
export type TownshipCreateFormInputs = z.infer<typeof townshipCreateSchema>;

export interface TOWNSHIP {
  id: string;
  Name: string;
  Status: string;
  createdDate: Date;
}

interface TownshipColumn {
  id: "id" | "name" | "status" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: number) => string;
}

export interface TOWNSHIP_PAYLOAD {
  pagingParams: {
    PageSize: number;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

export const townshipColumns: readonly TownshipColumn[] = [
  {
    id: "name",
    label: "Township Name",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "status",
    label: "Township Status",
    minWidth: 130,
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

export const townshipPayload: TOWNSHIP_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: 0,
    SearchTerm: "",
  },
};

export const townshipStatuslists = [
  { id: 1, value: "ACTIVE" },
  { id: 2, value: "DISABLE" },
];
