import { z } from "zod";
import { paginateOptions } from "../../constants/config"; // Assuming paginateOptions is available here

export const roleSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  name: z
    .string()
    .min(2, { message: "Role Name must be at least 2 characters long" }),
});

export const roleUpdateSchema = z.object({
  id: z.number().min(0, { message: "id" }).default(0),
  name: z
    .string()
    .min(0, { message: "Role Name must be at least 2 characters long" }),
  // Status: z.string(),
});

export const roleCreateSchema = z.object({
  name: z
    .string()
    .min(0, { message: "Role Name must be at least 2 characters long" }),
  // Status: z.string()
});

export type RoleFormInputs = z.infer<typeof roleSchema>;
export type RoleUpdateFormInputs = z.infer<typeof roleUpdateSchema>;
export type RoleCreateFormInputs = z.infer<typeof roleCreateSchema>;

export interface ROLE {
  id: number;
  name: string;
  // Status: string;
}

interface RoleColumn {
  id: "id" | "name" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  sort?: boolean;
  format?: (value: number) => string;
}

export interface ROLE_PAYLOAD {
  pagingParams: {
    PageSize: number;
    CurrentPage: number;
    SortField: any;
    SortDir: any;
    SearchTerm: string;
  };
}

export const roleColumns: readonly RoleColumn[] = [
  {
    id: "name",
    label: "Role Name",
    minWidth: 130,
    numeric: false,
    disablePadding: false,
    sort: true,
  },
];

export const rolePayload: ROLE_PAYLOAD = {
  pagingParams: {
    PageSize: paginateOptions.rows,
    CurrentPage: 1,
    SortField: "name",
    SortDir: 0,
    SearchTerm: "",
  },
};

export const roleStatuslists = [
  { id: "active", value: "ACTIVE" },
  { id: "disable", value: "DISABLE" },
];
