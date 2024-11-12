import { configureStore } from '@reduxjs/toolkit'
import shareSlice, { SHARE_SLICE } from "./shares/shareSlice";
import countrySlice, { COUNTRY_SLICE } from "../src/modules/country/country.slice"
import stateSlice, { STATE_SLICE } from './modules/state/state.slice';

interface RootState {
    share: SHARE_SLICE;
    country: COUNTRY_SLICE;
    state: STATE_SLICE;
    // other slices of state...
  }

export const stores = configureStore({
  reducer: {
    share: shareSlice,
    country: countrySlice,
    state: stateSlice,
  },
})

// Infer the RootState type from the store itself
export type AppRootState = ReturnType<typeof stores.getState>;

// Infer AppDispatch from the store
export type AppDispatch = typeof stores.dispatch;