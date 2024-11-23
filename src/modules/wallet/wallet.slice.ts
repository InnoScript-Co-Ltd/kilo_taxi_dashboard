import { createSlice } from "@reduxjs/toolkit";
import { WALLET, WALLET_PAYLOAD, walletPayload } from "./wallet.payload";

// Define a type for pagination parameters, similar to STATE_PAGINATE_PARAMS
export interface WALLET_PAGINATE_PARAMS
  extends Pick<WALLET_PAYLOAD, "pagingParams"> {}

// Define a type for the wallet slice
export interface WALLET_SLICE {
  data: {
    wallets: Array<WALLET>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  wallet: null | WALLET;
  pagingParams: WALLET_PAYLOAD["pagingParams"];
}

const initialState: WALLET_SLICE = {
  data: {
    wallets: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  wallet: null,
  pagingParams: walletPayload.pagingParams,
};

// Create the wallet slice
const walletSlice = createSlice({
  name: "wallet",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    update: (state, action) => {
      state.wallet = action.payload;
      return state;
    },
    show: (state, action) => {
      state.wallet = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = walletSlice.actions;

// Export the reducer to be included in the store
export default walletSlice.reducer;
