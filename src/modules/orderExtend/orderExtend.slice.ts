import { createSlice } from "@reduxjs/toolkit";
import { ORDER_EXTEND, ORDER_EXTEND_PAYLOAD, orderExtendPayload } from "./orderExtend.payload";

// Define a type for pagination parameters for orderExtends
export interface ORDER_EXTEND_PAGINATE_PARAMS
  extends Pick<ORDER_EXTEND_PAYLOAD, "pagingParams"> {}

// Define a type for the orderExtend slice state
export interface ORDER_EXTEND_SLICE {
  data: {
    orderExtends: Array<ORDER_EXTEND>; // Array to hold orderExtend data
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  orderExtend: null | ORDER_EXTEND; // Holds single orderExtend details
  pagingParams: ORDER_EXTEND_PAYLOAD["pagingParams"]; // Pagination params for listing orderExtends
}

// Define initial state for the orderExtend slice
const initialState: ORDER_EXTEND_SLICE = {
  data: {
    orderExtends: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  orderExtend: null,
  pagingParams: orderExtendPayload.pagingParams, // Default pagination from orderExtend payload
};

// Create the orderExtend slice
const orderExtendSlice = createSlice({
  name: "orderExtend",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    show: (state, action) => {
      state.orderExtend = action.payload;
      return state;
    },

    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, show, setPaginate } = orderExtendSlice.actions;

// Export the reducer to be included in the store
export default orderExtendSlice.reducer;
