import { createSlice } from "@reduxjs/toolkit";
import { STATE, STATE_PAYLOAD, statePayload } from "./state.payload";

// Define a type for pagination parameters, similar to CITY_PAGINATE_PARAMS
export interface STATE_PAGINATE_PARAMS
  extends Pick<STATE_PAYLOAD, "pagingParams"> {}

// Define a type for the state slice, similar to CITY_SLICE
export interface STATE_SLICE {
  data: {
    states: Array<any>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  state: null | STATE;
  pagingParams: STATE_PAYLOAD["pagingParams"];
}

const initialState: STATE_SLICE = {
  data: {
    states: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  state: null,
  pagingParams: statePayload.pagingParams,
};

// Create the state slice
const stateSlice = createSlice({
  name: "state",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    update: (state, action) => {
      state.state = action.payload;
      return state;
    },
    show: (state, action) => {
      state.state = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = stateSlice.actions;

// Export the reducer to be included in the store
export default stateSlice.reducer;
