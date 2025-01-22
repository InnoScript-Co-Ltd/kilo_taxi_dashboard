import { createSlice } from "@reduxjs/toolkit";
import { ExtraDemand, ExtraDemand_PAYLOAD, extraDemandPayload } from "./extraDemand.payload";

// Define a type for pagination parameters, similar to STATE_PAGINATE_PARAMS
export interface ExtraDemand_PAGINATE_PARAMS
  extends Pick<ExtraDemand_PAYLOAD, "pagingParams"> {}

// Define a type for the extraDemand slice
export interface ExtraDemand_SLICE {
  data: {
    extraDemands: Array<ExtraDemand>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  extraDemand: null | ExtraDemand;
  pagingParams: ExtraDemand_PAYLOAD["pagingParams"];
}

const initialState: ExtraDemand_SLICE = {
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
  pagingParams: extraDemandPayload.pagingParams,
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
    update: (state, action) => {
      state.extraDemand = action.payload;
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
export const { index, update, show, setPaginate } = extraDemandSlice.actions;

// Export the reducer to be included in the store
export default extraDemandSlice.reducer;
