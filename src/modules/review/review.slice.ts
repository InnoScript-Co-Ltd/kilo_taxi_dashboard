import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REVIEW, REVIEW_PAYLOAD, reviewPayload } from "./review.payload";

// Define a type for the state slice, similar to CITY_SLICE
export interface REVIEW_SLICE {
  data: {
    reviews: Array<any>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  review: null | REVIEW;
  pagingParams: REVIEW_PAYLOAD["pagingParams"];
}

const initialState: REVIEW_SLICE = {
  data: {
    reviews: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  review: null,
  pagingParams: reviewPayload.pagingParams,
};

// Create the state slice
const reviewSlice = createSlice({
  name: "review",
  initialState: initialState,
  reducers: {
    index: (
      state,
      action: PayloadAction<{ reviews: REVIEW[]; paging: any }>
    ) => {
      state.data = action.payload;
      return state;
    },
    update: (state, action: PayloadAction<REVIEW>) => {
      state.review = action.payload;
      return state;
    },
    show: (state, action: PayloadAction<REVIEW>) => {
      state.review = action.payload;
      return state;
    },
    setPaginate: (
      state,
      action: PayloadAction<REVIEW_PAYLOAD["pagingParams"]>
    ) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = reviewSlice.actions;

// Export the reducer to be included in the store
export default reviewSlice.reducer;
