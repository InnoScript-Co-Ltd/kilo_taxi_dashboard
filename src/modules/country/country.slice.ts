import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { COUNTRY, COUNTRY_PAYLOAD, countryPayload } from "./country.payload";


/**
 * Interface representing the shape of the country slice in Redux.
 */
export interface COUNTRY_SLICE {
  data: {
    countries: COUNTRY[];
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  country: null | COUNTRY;
  pagingParams: COUNTRY_PAYLOAD["pagingParams"];
}

// Initial state for the country slice
const initialState: COUNTRY_SLICE = {
  data: {
    countries: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  country: null,
  pagingParams: countryPayload.pagingParams, // Make sure this matches the structure
};

// Create a slice of the Redux store for country data
const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    /**
     * Sets the country data in the state.
     * @param state The current state.
     * @param action The action containing the payload.
     * @returns The updated state.
     */
    index: (state, action: PayloadAction<{ countries: COUNTRY[]; paging: any }>) => {
      state.data = action.payload;
    },
    /**
     * Updates the current country data in the state.
     * @param state The current state.
     * @param action The action containing the updated country data.
     * @returns The updated state.
     */
    update: (state, action: PayloadAction<COUNTRY>) => {
      state.country = action.payload;
    },
    /**
     * Shows the details of a specific country.
     * @param state The current state.
     * @param action The action containing the country data to show.
     * @returns The updated state.
     */
    show: (state, action: PayloadAction<COUNTRY>) => {
      state.country = action.payload;
    },
    /**
     * Sets the pagination parameters.
     * @param state The current state.
     * @param action The action containing the pagination parameters.
     * @returns The updated state.
     */
    setPaginate: (state, action: PayloadAction<COUNTRY_PAYLOAD["pagingParams"]>) => {
      state.pagingParams = action.payload; // Use the full type
    },
  },
});

// Export the actions and reducer
export const { index, update, show, setPaginate } = countrySlice.actions;
export default countrySlice.reducer;
