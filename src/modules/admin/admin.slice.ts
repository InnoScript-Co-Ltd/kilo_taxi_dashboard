import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ADMIN, ADMIN_PAYLOAD, adminPayload } from "./admin.payload";


/**
 * Interface representing the shape of the country slice in Redux.
 */
export interface ADMIN_SLICE {
  data: {
    admins: ADMIN[];
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  admin: null | ADMIN;
  pagingParams: ADMIN_PAYLOAD["pagingParams"];
}

// Initial state for the country slice
const initialState: ADMIN_SLICE = {
  data: {
    admins: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  admin: null,
  pagingParams: adminPayload.pagingParams, // Make sure this matches the structure
};

// Create a slice of the Redux store for country data
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    /**
     * Sets the country data in the state.
     * @param state The current state.
     * @param action The action containing the payload.
     * @returns The updated state.
     */
    index: (state, action: PayloadAction<{ admins: ADMIN[]; paging: any }>) => {
      state.data = action.payload;
    },
    /**
     * Updates the current country data in the state.
     * @param state The current state.
     * @param action The action containing the updated country data.
     * @returns The updated state.
     */
    update: (state, action: PayloadAction<ADMIN>) => {
      state.admin = action.payload;
    },
    /**
     * Shows the details of a specific country.
     * @param state The current state.
     * @param action The action containing the country data to show.
     * @returns The updated state.
     */
    show: (state, action: PayloadAction<ADMIN>) => {
      state.admin = action.payload;
    },
    /**
     * Sets the pagination parameters.
     * @param state The current state.
     * @param action The action containing the pagination parameters.
     * @returns The updated state.
     */
    setPaginate: (state, action: PayloadAction<ADMIN_PAYLOAD["pagingParams"]>) => {
      state.pagingParams = action.payload; // Use the full type
    },
  },
});

// Export the actions and reducer
export const { index, update, show, setPaginate } = adminSlice.actions;
export default adminSlice.reducer;
