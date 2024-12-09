import { env } from "./config";

/** env[0] = Local | env[1] = Production */
export const baseURL = env[0];

export const endpoints = {
  admin: "Admin",
  customer: "Customer",
  promotion: "Promotion",
  scheduleBooking: "scheduleBooking",
  country: "Country",
  city: "City",
  state: "State",
  merchant: "Merchant",
  driver: "Driver",
  vehicle: "Vehicle",
  wallet: "Wallet",
  order: "Order",
  paymentChannel: "PaymentChannel",
  login: "auth/login",
  image: `${baseURL}/storage/images`,
  status: "status",
};
