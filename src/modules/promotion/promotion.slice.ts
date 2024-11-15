import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PROMOTION, PROMOTION_PAYLOAD, promotionPayload } from "./promotion.payload";

// Define a type for the state slice, similar to CITY_SLICE
export interface PROMOTION_SLICE {
  data: {
    promotions: Array<any>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  promotion: null | PROMOTION;
  pagingParams: PROMOTION_PAYLOAD["pagingParams"];
}

const initialState: PROMOTION_SLICE = {
  data: {
    promotions: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  promotion: null,
  pagingParams: promotionPayload.pagingParams,
};

// Create the state slice
const promotionSlice = createSlice({
  name: "promotion",
  initialState: initialState,
  reducers: {
    index: (state, action: PayloadAction<{ promotions: PROMOTION[]; paging: any }>) => {
      state.data = action.payload;
      return state;
    },
    update: (state, action: PayloadAction<PROMOTION>) => {
      state.promotion = action.payload;
      return state;
    },
    show: (state, action: PayloadAction<PROMOTION>) => {
      state.promotion = action.payload;
      return state;
    },
    setPaginate: (state, action: PayloadAction<PROMOTION_PAYLOAD["pagingParams"]>) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = promotionSlice.actions;

// Export the reducer to be included in the store
export default promotionSlice.reducer;
