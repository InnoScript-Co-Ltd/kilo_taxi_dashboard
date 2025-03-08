import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

export const townshipSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  Name: z
    .string()
    .min(2, { message: "Township Name must be at least 2 characters long" }),
  Status: z.number(),
  cityId: z.number().int(),
});

export const townshipUpdateSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  Name: z
    .string()
    .min(0, { message: "Township Name must be at least 2 characters long" }),
  Status: z.number(),
  cityId: z.number().int(),
});

export const townshipCreateSchema = z.object({
  Name: z
    .string()
    .min(0, { message: "Township Name must be at least 2 characters long" }),
  Status: z.number(),
  cityId: z.number().int(),
});

export type TownshipFormInputs = z.infer<typeof townshipSchema>;
export type TownshipUpdateFormInputs = z.infer<typeof townshipUpdateSchema>;
export type TownshipCreateFormInputs = z.infer<typeof townshipCreateSchema>;

export interface TOWNSHIP {
  id: number;
  name: string;
  status: number;
  createdDate: Date;
  cityId: number;
  cityName: string;
  cityDto: any;
}

interface TownshipColumn {
  id: "id" | "name" | "status" | "cityName" | "action";
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
    id: "cityName",
    label: "City Name",
    minWidth: 100,
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
  { id: 0, value: "ACTIVE" },
  { id: 1, value: "DISABLE" },
  { id: 2, value: "DELETED" },
];
