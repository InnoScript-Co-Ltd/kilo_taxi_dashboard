import { paginateOptions } from "../../constants/config";
import { z } from "zod";

const BaseCustomerSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  Name: z
    .string()
    .min(2, { message: "Country Name must be at least 2 characters long" }),
  Email: z.string().email(),
  Phone: z.string().min(8, { message: "phone number is at least 8 digit" }),
  role: z.string().nullable().default("Customer"),
  MobilePrefix: z.string(),
  Dob: z.date().nullable(),
  Address: z.string(),
  City: z.string(),
  Township: z.string(),
  Gender: z.number(),
  Status: z.number(),
  KycStatus: z.number(),
  file_Profile: z.any().nullable(),
});

// 🟢 Schema for CREATE (includes Password)
export const CreateCustomerSchema = BaseCustomerSchema.extend({
  Password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

// 🟡 Schema for UPDATE (no Password field)
export const UpdateCustomerSchema = BaseCustomerSchema;

export type CustomerCreateFormInputs = z.infer<typeof CreateCustomerSchema>;
export type CustomerUpdateFormInputs = z.infer<typeof UpdateCustomerSchema>;

/**
 * Interface representing the shape of a country object.
 */
export interface CUSTOMER {
  id: string;
  name: string;
  phone: string;
  profile: string;
  mobilePrefix: string;
  role: string;
  email: string;
  dob: Date | null | string;
  // nrc: string | null;
  // nrcImageFront: string;
  // nrcImageBack: string;
  emailVerifiedAt: Date | null;
  phoneVerifiedAt: Date | null;
  password: string;
  address: string;
  // state: string;
  city: string;
  township: string;
  gender: number;
  status: number;
  kycStatus: number;
  createdBy: string;
  updatedBy: string;
  // file_NrcImageFront: string;
  // file_NrcImageBack: string;
  file_profile: string;
  action: any;
  // Add other country properties as necessary
}

type CustomerColumnId = keyof CUSTOMER;

/**
 * Represents the structure of a column in the country table.
 */
export interface Customer_Column {
  /** Unique identifier for the column */
  id: CustomerColumnId;
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
export interface CUSTOMER_PAYLOAD {
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
export const columns: readonly Customer_Column[] = [
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
    id: "profile",
    label: "Profile",
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
  // {
  //   id: "status",
  //   label: "Status",
  //   minWidth: 50,
  //   maxWidth: 50,
  //   numeric: false,
  //   disablePadding: false,
  // },
  {
    id: "kycStatus",
    label: "KycStatus",
    minWidth: 50,
    maxWidth: 50,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "createdBy",
    label: "Created By",
    minWidth: 50,
    maxWidth: 50,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "updatedBy",
    label: "Updated By",
    minWidth: 50,
    maxWidth: 50,
    numeric: false,
    disablePadding: false,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
    maxWidth: 50,
    numeric: false,
    disablePadding: false,
  },
];
/**
 * Default payload object for country operations.
 */
export const customerPayload: CUSTOMER_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: 0,
    SearchTerm: "",
  },
};
