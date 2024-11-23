import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

export const vehicleSchema = z.object({
  VehicleNo: z.string().min(1, { message: "Vehicle number is required" }),
  VehicleType: z.string().min(1, { message: "Vehicle type is required" }),
  Model: z.string().min(1, { message: "Model is required" }),
  FuelType: z.string().min(1, { message: "Fuel type is required" }),
  Status: z.string().min(1, { message: "Status is required" }),
  DriverId: z.number().min(1, { message: "Driver ID is required" }),
  file_BusinessLicenseImage: z.instanceof(File).nullable(),
  file_VehicleLicenseFront: z.instanceof(File).nullable(),
  file_VehicleLicenseBack: z.instanceof(File).nullable(),
});

export type VehicleFormInputs = z.infer<typeof vehicleSchema>;

export interface VEHICLE {
    id: string;    
    vehicleNo: string;
    vehicleType: string;
    model: string;
    fuelType: string;
    businessLicenseImage: string;
    vehicleLicenseFront: string;
    vehicleLicenseBack: string;
    status: string;
    driverId: number;
    file_BusinessLicenseImage:File;
    file_VehicleLicenseFront:File;
    file_VehicleLicenseBack:File;

  }

  // Define columns for the vehicle table
interface VehicleColumn {
    id: "id" | "vehicleNo" | "vehicleType" | "model" | "fuelType" | "status" | "driverId" | "file_BusinessLicenseImage" | "file_VehicleLicenseImage" | "action";
    label: string;
    minWidth?: number;
    align?: "right" | "left";
    numeric: boolean;
    disablePadding: boolean;
    sort?: boolean;
  }
  
  export const vehicleColumns: readonly VehicleColumn[] = [
    { id: "vehicleNo", label: "Vehicle No", minWidth: 130, numeric: false, disablePadding: false, sort: true },
    { id: "vehicleType", label: "Vehicle Type", minWidth: 125, numeric: false, disablePadding: false, sort: true },
    { id: "model", label: "Model", minWidth: 150, numeric: false, disablePadding: false, sort: true },
    { id: "fuelType", label: "Fuel Type", minWidth: 100, numeric: false, disablePadding: false, sort: false },
    { id: "status", label: "Status", minWidth: 90, numeric: false, disablePadding: false, sort: true },
    { id: "driverId", label: "Driver ID", minWidth: 1, numeric: true, disablePadding: false, sort: false },
    { id: "action", label: "Action", minWidth: 60, numeric: false, disablePadding: false, sort: false },
  ];
  
  // Define Vehicle Payload
  export interface VEHICLE_PAYLOAD {
    pagingParams: {
      PageSize: number;
      CurrentPage: number;
      SortField: any;
      SortDir: any;
      SearchTerm: string;
    };
  }
  
  // Vehicle payload example
  export const vehiclePayload: VEHICLE_PAYLOAD = {
    pagingParams: {
      PageSize: paginateOptions.rows,
      CurrentPage: 1,
      SortField: "vehicleNo",
      SortDir: 0,
      SearchTerm: "",
    },
  };

