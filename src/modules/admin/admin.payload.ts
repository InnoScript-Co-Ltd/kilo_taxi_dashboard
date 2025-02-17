import { paginateOptions } from "../../constants/config";
import { z } from "zod";

export const adminCreateSchema = z.object({
  Name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  Email: z.string().email(),
  Role: z.string().nullable().default("Admin"),
  Phone: z.string().min(8, { message: "phone number is at least 8 digit" }),
  Gender: z.string().default("MALE"),
  Address: z.string(),
});

export const adminUpdateSchema = z.object({
  Name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  Email: z.string().email(),
  Phone: z.string().min(8, { message: "phone number is at least 8 digit" }),
  Gender: z.string(),
  Address: z.string(),
});

export type AdminCreateFormInputs = z.infer<typeof adminCreateSchema>;
export type AdminUpdateFormInputs = z.infer<typeof adminUpdateSchema>;

// export const adminSchema = z.object({
//   id: z.number().min(0, { message: "id" }).default(0),
//   Name: z
//     .string()
//     .min(2, { message: "Name must be at least 2 characters long" }),
//   // zipCode: z.string().min(2, { message: "Zip Code is required" }),
//   Email: z.string().email(),
//   role: z.string().nullable().default("Admin"),
//   Phone: z.string().min(8, { message: "phone number is at least 8 digit" }),
//   Password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
//     .regex(/[A-Z]/, {
//       message: "Password must contain at least one uppercase letter",
//     }) // Uppercase letter
//     .regex(/[a-z]/, {
//       message: "Password must contain at least one lowercase letter",
//     }) // Lowercase letter
//     .regex(/[0-9]/, { message: "Password must contain at least one number" }) // Number
//     .regex(/[^a-zA-Z0-9]/, {
//       message: "Password must contain at least one special character",
//     }), // Special character
//   gender: z.string(),
//   status: z.string(),
//   address: z.string(),
//   emailVerifiedAt: z.date().nullable(),
//   phoneVerifiedAt: z.date().nullable()
// });

// export type AdminFormInputs = z.infer<typeof adminSchema>;

/**
 * Interface representing the shape of a country object.
 */
export interface ADMIN {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  gender: string;
  address: string;
  status: string;
  emailVerifiedAt: Date;
  phoneVerifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  resetPassword: any;
  action: any;
  // Add other country properties as necessary
}

type AdminColumnId = keyof ADMIN;

/**
 * Represents the structure of a column in the country table.
 */
export interface Admin_Column {
  /** Unique identifier for the column */
  id: AdminColumnId;
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
export interface ADMIN_PAYLOAD {
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
 * Default payload object for country operations.
 */
export const adminPayload: ADMIN_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: 0,
    SearchTerm: "",
  },
};

/**
 * An array of columns for displaying the country table.
 */
export const columns: readonly Admin_Column[] = [
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    maxWidth: 300,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 200,
    maxWidth: 250,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    maxWidth: 150,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 50,
    maxWidth: 50,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "role",
    label: "Role",
    minWidth: 50,
    maxWidth: 50,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 50,
    maxWidth: 50,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "emailVerifiedAt",
    label: "Email Verified At",
    minWidth: 200,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "phoneVerifiedAt",
    label: "Phone Verified At",
    minWidth: 200,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 200,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "updatedAt",
    label: "Updated At",
    minWidth: 200,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "deletedAt",
    label: "Deleted At",
    minWidth: 200,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "resetPassword",
    label: "Reset Password",
    minWidth: 200,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 200,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
  },
];
