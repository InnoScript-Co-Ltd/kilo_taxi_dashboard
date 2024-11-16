import { env } from "./config"

/** env[0] = Local | env[1] = Production */
export const baseURL = env[0];

export const endpoints = {
    admin: "Admin",
    driver:"Driver",
    vehicle:"Vehicle",
    wallet:"Wallet",  
    login: "auth/login",
    image: `${baseURL}/storage/images`,
    status: "status",
}