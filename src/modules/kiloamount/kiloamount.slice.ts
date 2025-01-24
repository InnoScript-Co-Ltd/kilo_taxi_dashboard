import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  KILOAMOUNT,
  KILOAMOUNT_PAYLOAD,
  kiloAmountPayload,
} from "./kiloamount.payload";

// Define a type for the state slice, similar to CITY_SLICE
export interface KILOAMOUNT_SLICE {
  data: {
    kiloAmounts: KILOAMOUNT[];
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  kiloAmount: null | KILOAMOUNT;
  pagingParams: KILOAMOUNT_PAYLOAD["pagingParams"];
}

const initialState: KILOAMOUNT_SLICE = {
  data: {
    kiloAmounts: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  kiloAmount: null,
  pagingParams: kiloAmountPayload.pagingParams,
};

// Create the state slice
const kiloAmountSlice = createSlice({
  name: "kiloAmount",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    show: (state, action: PayloadAction<KILOAMOUNT>) => {
      state.kiloAmount = action.payload;
      return state;
    },
    update: (state, action: PayloadAction<KILOAMOUNT>) => {
      state.kiloAmount = action.payload;
      return state;
    },
    setPaginate: (
      state,
      action: PayloadAction<KILOAMOUNT_PAYLOAD["pagingParams"]>
    ) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = kiloAmountSlice.actions;

// Export the reducer to be included in the store
export default kiloAmountSlice.reducer;
