import { configureStore } from "@reduxjs/toolkit";
import shareSlice from "./shares/shareSlice";
import adminSlice from "./modules/admin/admin.slice";
import customerSlice from "./modules/customer/customer.slice";
import promotionSlice from "./modules/promotion/promotion.slice";
import reviewSlice from "./modules/review/review.slice";
import scheduleSlice from "./modules/scheduleBooking/scheduleBooking.slice";
import driverSlice from "./modules/driver/driver.slice";
import vehicleSlice from "./modules/vehicle/vehicle.slice";
import walletSlice from "./modules/wallet/wallet.slice";
import orderSlice from "./modules/order/order.slice";
import reasonSlice from "./modules/reason/reason.slice";
import topupTransactionSlice from "./modules/topupTransaction/topupTransaction.slice";

// interface RootState {
//     share: SHARE_SLICE;
//     admin: ADMIN_SLICE;
//     customer: CUSTOMER_SLICE;
//     promotion: PROMOTION_SLICE;
//     schedule: SCHEDULE_SLICE;
//     driver: DRIVER_SLICE;
//     vehicle: VEHICLE_SLICE;
//     wallet: WALLET_SLICE;
//     // other slices of state...
//   }

export const stores = configureStore({
  reducer: {
    share: shareSlice,
    admin: adminSlice,
    customer: customerSlice,
    promotion: promotionSlice,
    review: reviewSlice,
    scheduleBookings: scheduleSlice,
    driver: driverSlice,
    vehicle: vehicleSlice,
    wallet: walletSlice,
    order: orderSlice,
    reason: reasonSlice,
    topUpTransaction: topupTransactionSlice
  },
});

// Infer the RootState type from the store itself
export type AppRootState = ReturnType<typeof stores.getState>;

// Infer AppDispatch from the store
export type AppDispatch = typeof stores.dispatch;
