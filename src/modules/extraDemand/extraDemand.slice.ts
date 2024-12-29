import { createSlice } from "@reduxjs/toolkit";
import { ORDER, ORDER_PAYLOAD, extraDemandPayload } from "./extraDemand.payload";

// Define a type for pagination parameters for extraDemands
export interface ORDER_PAGINATE_PARAMS
  extends Pick<ORDER_PAYLOAD, "pagingParams"> {}

// Define a type for the extraDemand slice state
export interface ORDER_SLICE {
  data: {
    extraDemands: Array<ORDER>; // Array to hold extraDemand data
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  extraDemand: null | ORDER; // Holds single extraDemand details
  pagingParams: ORDER_PAYLOAD["pagingParams"]; // Pagination params for listing extraDemands
}

// Define initial state for the extraDemand slice
const initialState: ORDER_SLICE = {
  data: {
    extraDemands: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  extraDemand: null,
  pagingParams: extraDemandPayload.pagingParams, // Default pagination from extraDemand payload
};

// Create the extraDemand slice
const extraDemandSlice = createSlice({
  name: "extraDemand",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    show: (state, action) => {
      state.extraDemand = action.payload;
      return state;
    },

    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, show, setPaginate } = extraDemandSlice.actions;

// Export the reducer to be included in the store
export default extraDemandSlice.reducer;
