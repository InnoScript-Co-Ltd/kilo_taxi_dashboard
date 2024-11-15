import { env } from "./config"

/** env[0] = Local | env[1] = Production */
export const baseURL = env[0];

export const endpoints = {
    admin: "Admin",
    customer: "Customer",
    country: "Country",
    city: "City",
    state:"State",
    merchant: "Merchant",

    login: "auth/login",
    image: `${baseURL}/storage/images`,
    status: "status",
}