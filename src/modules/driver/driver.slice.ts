import { createSlice } from "@reduxjs/toolkit";
import { DRIVER, DRIVER_PAYLOAD, driverPayload } from "./driver.payload";

// Define a type for pagination parameters for drivers
export interface DRIVER_PAGINATE_PARAMS
  extends Pick<DRIVER_PAYLOAD, "pagingParams"> {}

// Define a type for the driver slice state
export interface DRIVER_SLICE {
  data: {
    drivers: Array<DRIVER>; // Array to hold driver data
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  driver: null | DRIVER; // Holds single driver details
  pagingParams: DRIVER_PAYLOAD["pagingParams"]; // Pagination params for listing drivers
}

// Define initial state for the driver slice
const initialState: DRIVER_SLICE = {
  data: {
    drivers: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  driver: null,
  pagingParams: driverPayload.pagingParams, // Default pagination from driver payload
};

// Create the driver slice
const driverSlice = createSlice({
  name: "driver",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    show: (state, action) => {
      state.driver = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, show, setPaginate } = driverSlice.actions;

// Export the reducer to be included in the store
export default driverSlice.reducer;
