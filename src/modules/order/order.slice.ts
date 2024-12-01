import { createSlice } from "@reduxjs/toolkit";
import { ORDER, ORDER_PAYLOAD, orderPayload } from "./order.payload";

// Define a type for pagination parameters for orders
export interface ORDER_PAGINATE_PARAMS
  extends Pick<ORDER_PAYLOAD, "pagingParams"> {}

// Define a type for the order slice state
export interface ORDER_SLICE {
  data: {
    orders: Array<ORDER>; // Array to hold order data
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  order: null | ORDER; // Holds single order details
  pagingParams: ORDER_PAYLOAD["pagingParams"]; // Pagination params for listing orders
}

// Define initial state for the order slice
const initialState: ORDER_SLICE = {
  data: {
    orders: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  order: null,
  pagingParams: orderPayload.pagingParams, // Default pagination from order payload
};

// Create the order slice
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    show: (state, action) => {
      state.order = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, show, setPaginate } = orderSlice.actions;

// Export the reducer to be included in the store
export default orderSlice.reducer;
