import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here
import { VEHICLE } from "../vehicle/vehicle.payload";

// Define Driver Schema
export const driverSchema = z.object({
  id: z.number().min(1, { message: "Invalid ID format" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  // mobilePrefix: z.string().min(1, { message: "Mobile Prefix is required" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long" }),
  // email: z.string().email({ message: "Invalid email address" }),
  dob: z.date().nullable(),
  nrc: z.string().min(6, { message: "NRC must be at least 6 characters" }),
  role: z.string().nullable().default("Driver"),
  driverLicense: z
    .string()
    .min(6, { message: "Driver License must be at least 6 characters" }),
  // emailVerifiedAt: z.string().optional(),
  // phoneVerifiedAt: z.string().optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  state: z.string(),
  city: z.string(),
  townShip: z.string(),
  gender: z.number(),
  status: z.number(),
  availableStatus: z.number(),
  kycStatus: z.number(),
  referralMobileNumber: z.string(),
  propertyStatus: z.number(),
  file_profile: z.any().nullable(),
  // file_nrcImageFront: z.any().nullable(),
  // file_nrcImageBack: z.any().nullable(),
  file_driverImageLicenseFront: z.any().nullable(),
  file_driverImageLicenseBack: z.any().nullable(),

  // vehicle: z.array(vehicleSchema), // Use vehicleSchema as an array
  // wallet: z.array(walletSchema), // Use walletSchema as an array
});

export type DriverFormInputs = z.infer<typeof driverSchema>;

/**
 * Interface representing the shape of a driver object.
 */
export interface DRIVER {
  id: number;
  name: string;
  profile: string;
  mobilePrefix: string;
  phone: string;
  email: string;
  dob: Date | null | string;
  createdDate: Date;
  type: string;
  nrc: string;
  nrcImageFront: string;
  nrcImageBack: string;
  driverLicense: string;
  driverImageLicenseFront: string;
  driverImageLicenseBack: string;
  referralMobileNumber: string;
  availableStatus: number;
  propertyStatus: number;
  emailVerifiedAt: string;
  phoneVerifiedAt: string;
  password: string;
  address: string;
  state: string;
  city: string;
  townShip: string;
  gender: number;
  status: number;
  kycStatus: number;
  auditColumn: string;
  file_profile: string;
  file_nrcImageFront: string;
  file_nrcImageBack: string;
  file_driverImageLicenseFront: string;
  file_driverImageLicenseBack: string;
  vehicle: VEHICLE[]; // Use the VEHICLE interface as an array
  walletUserMapping: WALLETUSERMAPPING[]; // Use the WALLET interface as an array
  action: any;
}

// Define columns for driver table
interface DriverColumn {
  id:
    | "id"
    | "name"
    | "profile"
    | "mobilePrefix"
    | "type"
    | "phone"
    | "email"
    | "createdDate"
    | "dob"
    | "nrc"
    | "nrcImageFront"
    | "nrcImageBack"
    | "driverLicense"
    | "driverImageLicenseFront"
    | "driverImageLicenseBack"
    | "emailVerifiedAt"
    | "phoneVerifiedAt"
    | "password"
    | "gender"
    | "address"
    | "state"
    | "city"
    | "townShip"
    | "status"
    | "kycStatus"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: string) => string;
}
export interface WALLETUSERMAPPING {
  id: string;
  balance: string;
  createDate: Date | null;
  updateDate?: Date | null;
  status: number;
}

// Define State Payload
export interface DRIVER_PAYLOAD {
  pagingParams: {
    PageSize: number;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
    Id: string;
    Name: string;
    Phone: string;
    RegisterFrom: string;
    RegisterTo: string;
    Township: string;
    City: string;
    Status: string;
  };
}

export const driverColumns: readonly DriverColumn[] = [
  {
    id: "name",
    label: "Name",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "type",
    label: "Type",
    minWidth: 50,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "phone",
    label: "Phone Number",
    minWidth: 70,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "nrc",
    label: "NRC",
    minWidth: 70,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "driverLicense",
    label: "Driver License No",
    minWidth: 70,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "townShip",
    label: "TownShip",
    minWidth: 70,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "city",
    label: "City",
    minWidth: 70,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "createdDate",
    label: "Register DateTime",
    minWidth: 100,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 50,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
    numeric: false,
    disablePadding: false,
  },
];

// Driver payload example
export const driverPayload: DRIVER_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: "asc",
    SearchTerm: "",
    Id: "",
    Name: "",
    Phone: "",
    RegisterFrom: "",
    RegisterTo: "",
    Township: "",
    City: "",
    Status: "",
  },
};
