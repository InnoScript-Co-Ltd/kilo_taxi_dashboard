import { createSlice } from "@reduxjs/toolkit";
import {
  TOPUPTRANSACTION,
  TOPUPTRANSACTION_PAYLOAD,
  topupTransactionPayload,
} from "./topupTransaction.payload";

// Define a type for pagination parameters, similar to STATE_PAGINATE_PARAMS
export interface TOPUPTRANSACTION_PAGINATE_PARAMS
  extends Pick<TOPUPTRANSACTION_PAYLOAD, "pagingParams"> {}

// Define a type for the topupTransaction slice
export interface TOPUPTRANSACTION_SLICE {
  data: {
    topUpTransactions: Array<TOPUPTRANSACTION>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  topupTransaction: null | TOPUPTRANSACTION;
  pagingParams: TOPUPTRANSACTION_PAYLOAD["pagingParams"];
}

const initialState: TOPUPTRANSACTION_SLICE = {
  data: {
    topUpTransactions: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  topupTransaction: null,
  pagingParams: topupTransactionPayload.pagingParams,
};

// Create the topupTransaction slice
const topupTransactionSlice = createSlice({
  name: "topupTransaction",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    update: (state, action) => {
      state.topupTransaction = action.payload;
      return state;
    },
    show: (state, action) => {
      state.topupTransaction = action.payload;
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
  topupTransactionSlice.actions;

// Export the reducer to be included in the store
export default topupTransactionSlice.reducer;
