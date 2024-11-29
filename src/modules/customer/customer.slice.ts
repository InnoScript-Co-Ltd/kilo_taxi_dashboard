import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CUSTOMER,
  CUSTOMER_PAYLOAD,
  customerPayload,
} from "./customer.payload";

/**
 * Interface representing the shape of the country slice in Redux.
 */
export interface CUSTOMER_SLICE {
  data: {
    customers: CUSTOMER[];
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  customer: null | CUSTOMER;
  pagingParams: CUSTOMER_PAYLOAD["pagingParams"];
}

// Initial state for the country slice
const initialState: CUSTOMER_SLICE = {
  data: {
    customers: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  customer: null,
  pagingParams: customerPayload.pagingParams, // Make sure this matches the structure
};

// Create a slice of the Redux store for country data
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    /**
     * Sets the country data in the state.
     * @param state The current state.
     * @param action The action containing the payload.
     * @returns The updated state.
     */
    index: (
      state,
      action: PayloadAction<{ customers: CUSTOMER[]; paging: any }>
    ) => {
      state.data = action.payload;
    },
    /**
     * Updates the current country data in the state.
     * @param state The current state.
     * @param action The action containing the updated country data.
     * @returns The updated state.
     */
    update: (state, action: PayloadAction<CUSTOMER>) => {
      state.customer = action.payload;
    },
    /**
     * Shows the details of a specific country.
     * @param state The current state.
     * @param action The action containing the country data to show.
     * @returns The updated state.
     */
    show: (state, action: PayloadAction<CUSTOMER>) => {
      state.customer = action.payload;
    },
    /**
     * Sets the pagination parameters.
     * @param state The current state.
     * @param action The action containing the pagination parameters.
     * @returns The updated state.
     */
    setPaginate: (
      state,
      action: PayloadAction<CUSTOMER_PAYLOAD["pagingParams"]>
    ) => {
      state.pagingParams = action.payload; // Use the full type
    },
  },
});

// Export the actions and reducer
export const { index, update, show, setPaginate } = customerSlice.actions;
export default customerSlice.reducer;
