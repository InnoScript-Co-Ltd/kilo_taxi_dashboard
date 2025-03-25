import { createSlice } from "@reduxjs/toolkit";
import {
  DRIVERTRIP,
  DRIVERTRIP_PAYLOAD,
  driverTripPayload,
} from "./driverTrips.payload";

// Define a type for pagination parameters for orders
export interface DRIVERTRIP_PAGINATE_PARAMS
  extends Pick<DRIVERTRIP_PAYLOAD, "pagingParams"> {}

// Define a type for the order slice state
export interface DRIVERTRIP_SLICE {
  data: {
    driverTrips: Array<DRIVERTRIP>; // Array to hold order data
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  driverTrip: null | DRIVERTRIP; // Holds single order details
  pagingParams: DRIVERTRIP_PAYLOAD["pagingParams"]; // Pagination params for listing orders
}

// Define initial state for the order slice
const initialState: DRIVERTRIP_SLICE = {
  data: {
    driverTrips: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  driverTrip: null,
  pagingParams: driverTripPayload.pagingParams, // Default pagination from order payload
};

// Create the order slice
const driverTripSlice = createSlice({
  name: "driverTrips",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    show: (state, action) => {
      state.driverTrip = action.payload;
      return state;
    },

    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, show, setPaginate } = driverTripSlice.actions;

// Export the reducer to be included in the store
export default driverTripSlice.reducer;
