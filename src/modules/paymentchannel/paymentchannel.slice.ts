import { createSlice } from "@reduxjs/toolkit";
import {
  PaymentChannel_PAYLOAD,
  PAYMENTCHANNEL,
  paymentChannelPayload,
} from "./paymentchannel.payload";

// Define a type for pagination parameters, similar to STATE_PAGINATE_PARAMS
export interface PAYMENTCHANNEL_PAGINATE_PARAMS
  extends Pick<PaymentChannel_PAYLOAD, "pagingParams"> {}

// Define a type for the wallet slice
export interface PAYMENTCHANNEL_SLICE {
  data: {
    paymentChannels: Array<PAYMENTCHANNEL>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  paymentChannel: null | PAYMENTCHANNEL;
  pagingParams: PaymentChannel_PAYLOAD["pagingParams"];
}

const initialState: PAYMENTCHANNEL_SLICE = {
  data: {
    paymentChannels: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  paymentChannel: null,
  pagingParams: paymentChannelPayload.pagingParams,
};

// Create the wallet slice
const paymentChannelSlice = createSlice({
  name: "paymentChannel",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    update: (state, action) => {
      state.paymentChannel = action.payload;
      return state;
    },
    show: (state, action) => {
      state.paymentChannel = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = paymentChannelSlice.actions;

// Export the reducer to be included in the store
export default paymentChannelSlice.reducer;
