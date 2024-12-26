import { env } from "./config";

/** env[0] = Local | env[1] = Production */
export const baseURL = env[0];

export const endpoints = {
  admin: "Admin",
  customer: "Customer",
  promotion: "Promotion",
  review: "Review",
  scheduleBooking: "scheduleBooking",
  country: "Country",
  city: "City",
  state: "State",
  merchant: "Merchant",
  driver: "Driver",
  vehicle: "Vehicle",
  wallet: "Wallet",
  order: "Order",
  topupTransaction: "TopupTransaction",
  reason: "Reason",
  paymentChannel: "PaymentChannel",
  sms: "Sms",
  simulation: "Simulation",
  sos: "Sos",
  travelRate: "TravelRate",
  login: "auth/login",
  image: `${baseURL}/storage/images`,
  status: "status",
};
