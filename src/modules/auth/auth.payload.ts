import { z } from "zod";

// Define Wallet Schema
export const authSchema = z.object({
  // id: z.number().min(0, { message: "id" }).default(0),
  emailOrPhone: z
    .string()
    .min(2, { message: "emailOrPhone must be at least 2 characters long" }),
  password: z.string()
});

export type AuthFormInputs = z.infer<typeof authSchema>;