import { paginateOptions } from "../../constants/config";
import { z } from "zod";

export const stateSchema = z.object({
  name: z.string().min(2, { message: "Country Name must be at least 2 characters long" }),
  zipCode: z.string().min(2, { message: "Zip Code is required" }),
  countryId: z.string().min(1, { message: "Country id is required" }),
  profile: z.string(),
});

export type StateFormInputs = z.infer<typeof stateSchema>;

/**
 * Interface representing the shape of a country object.
 */
export interface STATE {
  id: string;
  name: string;
  zipCode: string;
  profile: string;
  countryId: string;
  countryName: string;
  // Add other country properties as necessary
}

// Define columns for state table
interface Column {
  id: "id" | "name" | "zipCode" | "profile" | "countryId" | "countryName" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean,
  disablePadding: boolean,
  sort?: boolean,
  format?: (value: number) => string;
}

// Define State Payload
export interface STATE_PAYLOAD {
  pagingParams: {
    PageSize: number,
    CurrentPage: number,
    SortField: any,
    SortDir: any,
    SearchTerm: string
  }
}

// Define columns structure for the state table
export const stateColumns: readonly Column[] = [
  { id: "name", label: "State Name", minWidth: 170 , numeric: false, disablePadding: false, sort: true },
  { id: "zipCode", label: "Zip Code", minWidth: 150, numeric: false, disablePadding: false, sort: true },
  { id: "profile", label: "Profile", minWidth: 150, numeric: false, disablePadding: false, sort: true },
  { id: "countryName", label: "Country Name", minWidth: 150, numeric: false, disablePadding: false, sort: false },
  { id: "action", label: "Action", minWidth: 50, numeric: false, disablePadding: false, sort: false }
];

// State payload example
export const statePayload: STATE_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: 0,
    SearchTerm: ""
  }
};
