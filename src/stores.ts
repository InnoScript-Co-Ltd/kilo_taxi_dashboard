import { configureStore } from '@reduxjs/toolkit'
import shareSlice, { SHARE_SLICE } from "./shares/shareSlice";
import driverSlice, { DRIVER_SLICE } from './modules/driver/driver.slice';
import vehicleSlice, { VEHICLE_SLICE } from './modules/vehicle/vehicle.slice';
import walletSlice, { WALLET_SLICE } from './modules/wallet/wallet.slice';

interface RootState {
    share: SHARE_SLICE;
    driver: DRIVER_SLICE;
    vehicle: VEHICLE_SLICE;
    wallet: WALLET_SLICE;
    // other slices of state...
  }

export const stores = configureStore({
  reducer: {
    share: shareSlice,
    driver: driverSlice,
    vehicle: vehicleSlice,
    wallet:walletSlice,
  },
})

// Infer the RootState type from the store itself
export type AppRootState = ReturnType<typeof stores.getState>;

// Infer AppDispatch from the store
export type AppDispatch = typeof stores.dispatch;