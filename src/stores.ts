import { configureStore } from '@reduxjs/toolkit'
import shareSlice, { SHARE_SLICE } from "./shares/shareSlice";
import countrySlice, { COUNTRY_SLICE } from "../src/modules/country/country.slice"
import stateSlice, { STATE_SLICE } from './modules/state/state.slice';
import driverSlice, { DRIVER_SLICE } from './modules/driver/driver.slice';
import vehicleSlice, { VEHICLE_SLICE } from './modules/vehicle/vehicle.slice';
import walletSlice, { WALLET_SLICE } from './modules/wallet/wallet.slice';
import adminSlice, { ADMIN_SLICE } from './modules/admin/admin.slice';
import customerSlice ,{ CUSTOMER_SLICE } from './modules/customer/customer.slice';

interface RootState {
    share: SHARE_SLICE;
    country: COUNTRY_SLICE;
    state: STATE_SLICE;
    driver: DRIVER_SLICE;
    vehicle: VEHICLE_SLICE;
    wallet: WALLET_SLICE;
    admin: ADMIN_SLICE;
    customer: CUSTOMER_SLICE;
    // other slices of state...
  }

export const stores = configureStore({
  reducer: {
    share: shareSlice,
    country: countrySlice,
    state: stateSlice,
    driver: driverSlice,
    vehicle: vehicleSlice,
    wallet:walletSlice,
    admin: adminSlice,
    customer: customerSlice,
  },
})

// Infer the RootState type from the store itself
export type AppRootState = ReturnType<typeof stores.getState>;

// Infer AppDispatch from the store
export type AppDispatch = typeof stores.dispatch;