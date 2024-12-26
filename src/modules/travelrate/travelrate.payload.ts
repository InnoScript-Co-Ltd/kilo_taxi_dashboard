import { paginateOptions } from "../../constants/config";
import { z } from "zod";

export const travelRateSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  unit: z.string(),
  rate: z.number(),
  vehicleTypeId: z.number(),
  cityId: z.number(),
});

export type TravelRateFormInputs = z.infer<typeof travelRateSchema>;

/**
 * Interface representing the shape of a sms object.
 */
export interface TRAVELRATE {
  id: string;
  unit: string;
  rate: number;
  vehicleTypeId: number;
  vehicleTypeName: string;
  cityId: number;
  cityName: string;
  action?: null;
}

type TravelRateColumnId = keyof TRAVELRATE;

// Define columns for state table
interface TravelRate_Column {
  id: TravelRateColumnId;
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
export interface TRAVELRATE_PAYLOAD {
  pagingParams: {
    PageSize: number | string;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

// Define columns structure for the state table
export const travelRateColumns: readonly TravelRate_Column[] = [
  {
    id: "unit",
    label: "Unit",
    minWidth: 200,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "rate",
    label: "Rate",
    minWidth: 100,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "vehicleTypeName",
    label: "VehicleType Name",
    minWidth: 100,
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
    minWidth: 100,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
  },
];

// State payload example
export const travelRatePayload: TRAVELRATE_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "unit",
    SortDir: 0,
    SearchTerm: "",
  },
};
