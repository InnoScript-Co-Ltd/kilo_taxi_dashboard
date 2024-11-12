import { paginateOptions } from "../../constants/config";
import { z } from "zod";

export const countrySchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  Name: z.string().min(2, { message: "Country Name must be at least 2 characters long" }),
  // zipCode: z.string().min(2, { message: "Zip Code is required" }),
  MobilePrefixNumber: z.string().min(1, { message: "Mobile Prefix is required" }),
  // flagIcon: z.string().nullable().default(null),
  file_FlagIcon: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Flag Icon is required",
    })
    .refine((file) => file.size <= 5000000, {
      message: "File size should be less than 5MB",
    }).optional()
});

export type CountryFormInputs = z.infer<typeof countrySchema>;


/**
 * Interface representing the shape of a country object.
 */
export interface COUNTRY {
  id: string;
  name: string;
  mobilePrefixNumber: string;
  flagIcon: string;
  zipCode: string
  // Add other country properties as necessary
}

/**
 * Represents the structure of a column in the country table.
 */
export interface Country_Column {
  /** Unique identifier for the column */
  id: "id" | "name" | "mobilePrefixNumber" | "flagIcon" | "action";
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
  format?: (value: number) => string;
}

/**
 * Payload structure for creating and updating a country,
 * as well as pagination parameters.
 */
export interface COUNTRY_PAYLOAD {
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
export const columns: readonly Country_Column[] = [
  { id: "name", label: "Name", minWidth: 170, maxWidth: 300, numeric: false, disablePadding: false },
  { id: "mobilePrefixNumber", label: "Mobile Prefix", minWidth: 200, maxWidth: 250, numeric: false, disablePadding: false },
  { id: "flagIcon", label: "FlagIcon", minWidth: 100, maxWidth: 150, numeric: false, disablePadding: false },
  { id: "action", label: "Action", minWidth: 50, maxWidth: 50, numeric: false, disablePadding: false }
];
/**
 * Default payload object for country operations.
 */
export const countryPayload: COUNTRY_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: 0,
    SearchTerm: ""
  }
};
