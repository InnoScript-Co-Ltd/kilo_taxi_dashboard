import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TRAVELRATE,
  TRAVELRATE_PAYLOAD,
  travelRatePayload,
} from "./travelrate.payload";

// Define a type for the state slice, similar to CITY_SLICE
export interface TRAVELRATE_SLICE {
  data: {
    travelRate: Array<any>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  travelRate: null | TRAVELRATE;
  pagingParams: TRAVELRATE_PAYLOAD["pagingParams"];
}

const initialState: TRAVELRATE_SLICE = {
  data: {
    travelRate: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  travelRate: null,
  pagingParams: travelRatePayload.pagingParams,
};

// Create the state slice
const travelRateSlice = createSlice({
  name: "travelRate",
  initialState: initialState,
  reducers: {
    index: (
      state,
      action: PayloadAction<{ travelRate: TRAVELRATE[]; paging: any }>
    ) => {
      state.data = action.payload;
      return state;
    },
    show: (state, action: PayloadAction<TRAVELRATE>) => {
      state.travelRate = action.payload;
      return state;
    },
    update: (state, action: PayloadAction<TRAVELRATE>) => {
      state.travelRate = action.payload;
      return state;
    },
    setPaginate: (
      state,
      action: PayloadAction<TRAVELRATE_PAYLOAD["pagingParams"]>
    ) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = travelRateSlice.actions;

// Export the reducer to be included in the store
export default travelRateSlice.reducer;
