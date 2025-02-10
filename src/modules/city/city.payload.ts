import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

export const citySchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  name: z.string().min(2, { message: "City Name must be at least 2 characters long" }),
});

export const cityUpdateSchema = z.object({
  Name: z.string().min(0, {message: "City Name must be at least 2 characters long"}),
  Status: z.string()
});

export const cityCreateSchema = z.object({
  Name: z.string().min(0, {message: "City Name must be at least 2 characters long"}),
  Status: z.string()
});

export type CityFormInputs = z.infer<typeof citySchema>;
export type CityUpdateFormInputs = z.infer<typeof cityUpdateSchema>;
export type CityCreateFormInputs = z.infer<typeof cityCreateSchema>;

export interface CITY {
  id: string;
  Name: string;
  Status: string;
}

interface CityColumn {
  id: "id" | "name" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: number) => string;
}

export interface CITY_PAYLOAD {
  pagingParams: {
    PageSize: number;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

export const cityColumns: readonly CityColumn[] = [
  {
    id: "name",
    label: "City Name",
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

export const cityPayload: CITY_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: 0,
    SearchTerm: "",
  },
};

export const cityStatuslists = [
  { id: "active", value: "ACTIVE" },
  { id: "disable", value: "DISABLE" },
];
