import { createSlice } from "@reduxjs/toolkit";
import { REASON, REASON_PAYLOAD, reasonPayload } from "./reason.payload";

// Define a type for pagination parameters, similar to STATE_PAGINATE_PARAMS
export interface REASON_PAGINATE_PARAMS
  extends Pick<REASON_PAYLOAD, "pagingParams"> {}

// Define a type for the reason slice
export interface REASON_SLICE {
  data: {
    reasons: Array<REASON>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  reason: null | REASON;
  pagingParams: REASON_PAYLOAD["pagingParams"];
}

const initialState: REASON_SLICE = {
  data: {
    reasons: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  reason: null,
  pagingParams: reasonPayload.pagingParams,
};

// Create the reason slice
const reasonSlice = createSlice({
  name: "reason",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    update: (state, action) => {
      state.reason = action.payload;
      return state;
    },
    show: (state, action) => {
      state.reason = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = reasonSlice.actions;

// Export the reducer to be included in the store
export default reasonSlice.reducer;
