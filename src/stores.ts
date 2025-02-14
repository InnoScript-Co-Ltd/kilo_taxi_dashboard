import { configureStore } from "@reduxjs/toolkit";
import shareSlice from "./shares/shareSlice";
import adminSlice from "./modules/admin/admin.slice";
import customerSlice from "./modules/customer/customer.slice";
import promotionSlice from "./modules/promotion/promotion.slice";
import reviewSlice from "./modules/review/review.slice";
import scheduleSlice from "./modules/scheduleBooking/scheduleBooking.slice";
import driverSlice from "./modules/driver/driver.slice";
import vehicleSlice from "./modules/vehicle/vehicle.slice";
import vehicleTypeSlice from "./modules/vehicleType/vehicleType.slice";
import walletSlice from "./modules/wallet/wallet.slice";
import orderSlice from "./modules/order/order.slice";
import reasonSlice from "./modules/reason/reason.slice";
import topupTransactionSlice from "./modules/topupTransaction/topupTransaction.slice";
import paymentChannelSlice from "./modules/paymentchannel/paymentchannel.slice";
import smsSlice from "./modules/sms/sms.slice";
import sosSlice from "./modules/sos/sos.slice";
import citySlice from "./modules/city/city.slice";
import townshipSlice from "./modules/township/township.slice";
import travelRateSlice from "./modules/travelrate/travelrate.slice";
import kiloAmountSlice from "./modules/kiloamount/kiloamount.slice";
import ExtraDemandSlice from "./modules/extraDemand/extraDemand.slice";

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
    city: citySlice,
    township: townshipSlice,
    customer: customerSlice,
    promotion: promotionSlice,
    review: reviewSlice,
    scheduleBookings: scheduleSlice,
    driver: driverSlice,
    vehicle: vehicleSlice,
    vehicleType: vehicleTypeSlice,
    wallet: walletSlice,
    order: orderSlice,
    reason: reasonSlice,
    topUpTransaction: topupTransactionSlice,
    paymentChannel: paymentChannelSlice,
    sms: smsSlice,
    sos: sosSlice,
    travelRate: travelRateSlice,
    kiloAmount: kiloAmountSlice,
    extraDemand: ExtraDemandSlice,
  },
});

// Infer the RootState type from the store itself
export type AppRootState = ReturnType<typeof stores.getState>;

// Infer AppDispatch from the store
export type AppDispatch = typeof stores.dispatch;
