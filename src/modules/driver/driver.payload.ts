import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

// Define Driver Schema
export const driverSchema = z.object({
  id: z.string().uuid({ message: "Invalid ID format" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  profile: z.string().url({ message: "Profile must be a valid URL" }),
  mobilePrefix: z.string().min(1, { message: "Mobile Prefix is required" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits long" }),
  email: z.string().email({ message: "Invalid email address" }),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date of birth must be in YYYY-MM-DD format" }),
  nrc: z.string().min(6, { message: "NRC must be at least 6 characters" }),
  nrcFront: z.string().url({ message: "NRC Front must be a valid URL" }),
  nrcBack: z.string().url({ message: "NRC Back must be a valid URL" }),
  driverLicense: z.string().min(6, { message: "Driver License must be at least 6 characters" }),
  driverLicenseFront: z.string().url({ message: "Driver License Front must be a valid URL" }),
  driverLicenseBack: z.string().url({ message: "Driver License Back must be a valid URL" }),
  emailVerifiedAt: z.string().optional(),
  phoneVerifiedAt: z.string().optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  gender: z.string(),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  state: z.string(),
  city: z.string(),
  township: z.string(),
  status: z.string(),
  kycStatus: z.string(),
  auditColumn: z.string().optional(),
});

export type DriverFormInputs = z.infer<typeof driverSchema>;

/**
 * Interface representing the shape of a driver object.
 */
export interface DRIVER {
  id: string;
  name: string;
  profile: string;
  mobilePrefix: string;
  phone: string;
  email: string;
  dob: string;
  nrc: string;
  nrcFront: string;
  nrcBack: string;
  driverLicense: string;
  driverLicenseFront: string;
  driverLicenseBack: string;
  emailVerifiedAt: string;
  phoneVerifiedAt: string;
  password: string;
  gender: string;
  address: string;
  state: string;
  city: string;
  township: string;
  status: string;
  kycStatus: string;
  auditColumn: string;
}

// Define columns for driver table
interface DriverColumn {
  id: "id" | "name" | "profile" | "mobilePrefix" | "phone" | "email" | "dob" | "nrc" | "nrcFront" | "nrcBack" | "driverLicense" | "driverLicenseFront" | "driverLicenseBack" | "emailVerifiedAt" | "phoneVerifiedAt" | "password" | "gender" | "address" | "state" | "city" | "township" | "status" | "kycStatus" | "auditColumn" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: string) => string;
}

// Define State Payload
export interface DRIVER_PAYLOAD {
    pagingParams: {
      PageSize: number,
      CurrentPage: number,
      SortField: any,
      SortDir: any,
      SearchTerm: string
    }
  }

export const driverColumns: readonly DriverColumn[] = [
  { id: "name", label: "Name", minWidth: 130, numeric: false, disablePadding: false, sort: true },
  { id: "phone", label: "Phone", minWidth: 125, numeric: false, disablePadding: false, sort: true },
  { id: "email", label: "Email", minWidth: 200, numeric: false, disablePadding: false, sort: true },
  { id: "status", label: "Status", minWidth: 90, numeric: false, disablePadding: false, sort: true },
  { id: "kycStatus", label: "KYC Status", minWidth: 100, numeric: false, disablePadding: false, sort: false },
  { id: "auditColumn", label: "Audit Column", minWidth: 130, numeric: false, disablePadding: false, sort: false },
];


// Driver payload example
export const driverPayload: DRIVER_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: "asc",
    SearchTerm: "",
  },
};