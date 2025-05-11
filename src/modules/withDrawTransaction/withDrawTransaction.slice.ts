import { createSlice } from "@reduxjs/toolkit";
import {
  WITHDRAWTRANSACTION,
  WITHDRAWTRANSACTION_PAYLOAD,
  withDrawTransactionPayload,
} from "./withDrawTransaction.payload";

// Define a type for pagination parameters, similar to STATE_PAGINATE_PARAMS
export interface WALLET_PAGINATE_PARAMS
  extends Pick<WITHDRAWTRANSACTION_PAYLOAD, "pagingParams"> {}

// Define a type for the wallet slice
export interface WITHDRAWTRANSACTION_SLICE {
  data: {
    withDrawTransactions: Array<WITHDRAWTRANSACTION>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  withDrawTransaction: null | WITHDRAWTRANSACTION;
  pagingParams: WITHDRAWTRANSACTION_PAYLOAD["pagingParams"];
}

const initialState: WITHDRAWTRANSACTION_SLICE = {
  data: {
    withDrawTransactions: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  withDrawTransaction: null,
  pagingParams: withDrawTransactionPayload.pagingParams,
};

// Create the wallet slice
const withDrawTransactionSlice = createSlice({
  name: "withDrawTransaction",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    update: (state, action) => {
      state.withDrawTransaction = action.payload;
      return state;
    },
    show: (state, action) => {
      state.withDrawTransaction = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } =
  withDrawTransactionSlice.actions;

// Export the reducer to be included in the store
export default withDrawTransactionSlice.reducer;
