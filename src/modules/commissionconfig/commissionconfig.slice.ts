import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  COMMISSIONCONFIG,
  COMMISSIONCONFIG_PAYLOAD,
  commissionConfigPayload,
} from "./commissionconfig.payload";

// Define a type for the state slice, similar to CITY_SLICE
export interface COMMISSIONCONFIG_SLICE {
  data: {
    commissionConfigs: COMMISSIONCONFIG[];
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  commissionConfig: null | COMMISSIONCONFIG;
  pagingParams: COMMISSIONCONFIG_PAYLOAD["pagingParams"];
}

const initialState: COMMISSIONCONFIG_SLICE = {
  data: {
    commissionConfigs: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  commissionConfig: null,
  pagingParams: commissionConfigPayload.pagingParams,
};

// Create the state slice
const commissionConfigSlice = createSlice({
  name: "commissionConfig",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    show: (state, action: PayloadAction<COMMISSIONCONFIG>) => {
      state.commissionConfig = action.payload;
      return state;
    },
    update: (state, action: PayloadAction<COMMISSIONCONFIG>) => {
      state.commissionConfig = action.payload;
      return state;
    },
    setPaginate: (
      state,
      action: PayloadAction<COMMISSIONCONFIG_PAYLOAD["pagingParams"]>
    ) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } =
  commissionConfigSlice.actions;

// Export the reducer to be included in the store
export default commissionConfigSlice.reducer;
