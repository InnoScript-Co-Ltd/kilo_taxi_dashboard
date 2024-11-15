import { configureStore } from '@reduxjs/toolkit'
import shareSlice, { SHARE_SLICE } from "./shares/shareSlice";
import countrySlice, { COUNTRY_SLICE } from "../src/modules/country/country.slice"
import stateSlice, { STATE_SLICE } from './modules/state/state.slice';
import adminSlice, { ADMIN_SLICE } from './modules/admin/admin.slice';
import customerSlice ,{ CUSTOMER_SLICE } from './modules/customer/customer.slice';
import promotionSlice ,{ PROMOTION_SLICE } from './modules/promotion/promotion.slice';
import scheduleSlice ,{ SCHEDULE_SLICE } from './modules/scheduleBooking/scheduleBooking.slice';

interface RootState {
    share: SHARE_SLICE;
    country: COUNTRY_SLICE;
    state: STATE_SLICE;
    admin: ADMIN_SLICE;
    customer: CUSTOMER_SLICE;
    promotion: PROMOTION_SLICE;
    schedule: SCHEDULE_SLICE
    // other slices of state...
  }

export const stores = configureStore({
  reducer: {
    share: shareSlice,
    country: countrySlice,
    state: stateSlice,
    admin: adminSlice,
    customer: customerSlice,
    promotion: promotionSlice,
    schedule: scheduleSlice
  },
})

// Infer the RootState type from the store itself
export type AppRootState = ReturnType<typeof stores.getState>;

// Infer AppDispatch from the store
export type AppDispatch = typeof stores.dispatch;