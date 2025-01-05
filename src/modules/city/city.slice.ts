import { createSlice } from "@reduxjs/toolkit";
import { CITY, CITY_PAYLOAD, cityPayload } from "./city.payload";

// Define a type for pagination parameters, similar to STATE_PAGINATE_PARAMS
export interface CITY_PAGINATE_PARAMS
  extends Pick<CITY_PAYLOAD, "pagingParams"> {}

// Define a type for the wallet slice
export interface CITY_SLICE {
  data: {
    cities: Array<CITY>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  city: null | CITY;
  pagingParams: CITY_PAYLOAD["pagingParams"];
}

const initialState: CITY_SLICE = {
  data: {
    cities: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  city: null,
  pagingParams: cityPayload.pagingParams,
};

// Create the wallet slice
const citySlice = createSlice({
  name: "city",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    update: (state, action) => {
      state.city = action.payload;
      return state;
    },
    show: (state, action) => {
      state.city = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = citySlice.actions;

// Export the reducer to be included in the store
export default citySlice.reducer;
