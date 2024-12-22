import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

export const vehicleTypeSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  Name: z.string(),
  Description: z.string(),
});

export type VehicleTypeFormInputs = z.infer<typeof vehicleTypeSchema>;

export interface VEHICLE_TYPE {
  id: string;
  name: string;
  description: string;
  action?: null;
}

type vehicleTypeColumnId = keyof VEHICLE_TYPE;

// Define columns for the vehicle type table
interface VehicleTypeColumn {
  id: vehicleTypeColumnId;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right" | "left";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: number) => string;
}

export const vehicleTypeColumns: readonly VehicleTypeColumn[] = [
  {
    id: "name",
    label: "Name",
    minWidth: 100,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "description",
    label: "Description",
    minWidth: 100,
    maxWidth: 200,
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
    sort: false,
  },
];

// Define Vehicle Type Payload
export interface VEHICLE_TYPE_PAYLOAD {
  pagingParams: {
    PageSize: number | string;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

// Vehicle Type payload example
export const vehicleTypePayload: VEHICLE_TYPE_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: 0,
    SearchTerm: "",
  },
};
