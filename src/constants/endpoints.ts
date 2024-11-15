import { env } from "./config"

/** env[0] = Local | env[1] = Production */
export const baseURL = env[0];

export const endpoints = {
    login: "auth/login",
    country: "Country",
    city: "City",
    state:"State",
    merchant: "Merchant",
    driver:"Driver",
    vehicle:"Vehicle",
    wallet:"Wallet",
    customer:"Customer",    
    image: `${baseURL}/storage/images`,
    status: "status",
}