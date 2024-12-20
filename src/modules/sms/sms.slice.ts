import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SMS, SMS_PAYLOAD, smsPayload } from "./sms.payload";

// Define a type for the state slice, similar to CITY_SLICE
export interface SMS_SLICE {
  data: {
    sms: Array<any>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  sms: null | SMS;
  pagingParams: SMS_PAYLOAD["pagingParams"];
}

const initialState: SMS_SLICE = {
  data: {
    sms: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  sms: null,
  pagingParams: smsPayload.pagingParams,
};

// Create the state slice
const smsSlice = createSlice({
  name: "sms",
  initialState: initialState,
  reducers: {
    index: (state, action: PayloadAction<{ sms: SMS[]; paging: any }>) => {
      state.data = action.payload;
      return state;
    },
    show: (state, action: PayloadAction<SMS>) => {
      state.sms = action.payload;
      return state;
    },
    update: (state, action: PayloadAction<SMS>) => {
      state.sms = action.payload;
      return state;
    },
    setPaginate: (
      state,
      action: PayloadAction<SMS_PAYLOAD["pagingParams"]>
    ) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = smsSlice.actions;

// Export the reducer to be included in the store
export default smsSlice.reducer;
