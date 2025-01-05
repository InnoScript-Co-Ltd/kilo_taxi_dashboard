import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

// Define Wallet Schema
export const citySchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  name: z
    .string()
    .min(2, { message: "City Name must be at least 2 characters long" }),
});

export type CityFormInputs = z.infer<typeof citySchema>;

/**
 * Interface representing the shape of a wallet object.
 */
export interface CITY {
  id: string;
  name: string;
}

// Define columns for wallet table
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

// Define Wallet Payload
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

// Wallet payload example
export const cityPayload: CITY_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: 0,
    SearchTerm: "",
  },
};
