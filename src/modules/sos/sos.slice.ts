import { createSlice } from "@reduxjs/toolkit";
import { Sos_PAYLOAD, Sos, sosPayload } from "./sos.payload";

// Define a type for pagination parameters, similar to STATE_PAGINATE_PARAMS
export interface SOS_PAGINATE_PARAMS
  extends Pick<Sos_PAYLOAD, "pagingParams"> {}

// Define a type for the wallet slice
export interface Sos_SLICE {
  data: {
    sos: Array<Sos>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  sos: null | Sos;
  pagingParams: Sos_PAYLOAD["pagingParams"];
}

const initialState: Sos_SLICE = {
  data: {
    sos: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  sos: null,
  pagingParams: sosPayload.pagingParams,
};

// Create the wallet slice
const sosSlice = createSlice({
  name: "sos",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    update: (state, action) => {
      state.sos = action.payload;
      return state;
    },
    show: (state, action) => {
      state.sos = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, show, setPaginate } = sosSlice.actions;

// Export the reducer to be included in the store
export default sosSlice.reducer;
