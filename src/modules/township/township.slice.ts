import { createSlice } from "@reduxjs/toolkit";
import {
  TOWNSHIP,
  TOWNSHIP_PAYLOAD,
  townshipPayload,
} from "./township.payload";

// Define a type for pagination parameters, similar to STATE_PAGINATE_PARAMS
export interface TOWNSHIP_PAGINATE_PARAMS
  extends Pick<TOWNSHIP_PAYLOAD, "pagingParams"> {}

// Define a type for the wallet slice
export interface TOWNSHIP_SLICE {
  data: {
    townShips: Array<TOWNSHIP>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  township: null | TOWNSHIP;
  pagingParams: TOWNSHIP_PAYLOAD["pagingParams"];
}

const initialState: TOWNSHIP_SLICE = {
  data: {
    townShips: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  township: null,
  pagingParams: townshipPayload.pagingParams,
};

// Create the wallet slice
const townshipSlice = createSlice({
  name: "township",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload.payload;

      return state;
    },
    update: (state, action) => {
      state.township = action.payload;
      return state;
    },
    show: (state, action) => {
      state.township = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = townshipSlice.actions;

// Export the reducer to be included in the store
export default townshipSlice.reducer;
