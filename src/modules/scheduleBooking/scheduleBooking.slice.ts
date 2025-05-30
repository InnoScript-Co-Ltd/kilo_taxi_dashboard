import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SCHEDULE,
  SCHEDULE_PAYLOAD,
  schedulePayload,
} from "./scheduleBooking.payload";

// Define a type for the state slice, similar to CITY_SLICE
export interface SCHEDULE_SLICE {
  data: {
    orders: Array<any>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  scheduleBooking: null | SCHEDULE;
  pagingParams: SCHEDULE_PAYLOAD["pagingParams"];
}

const initialState: SCHEDULE_SLICE = {
  data: {
    orders: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  scheduleBooking: null,
  pagingParams: schedulePayload.pagingParams,
};

// Create the state slice
const scheduleSlice = createSlice({
  name: "scheduleBooking",
  initialState: initialState,
  reducers: {
    index: (
      state,
      action: PayloadAction<{ orders: SCHEDULE[]; paging: any }>
    ) => {
      state.data = action.payload;
      return state;
    },
    update: (state, action: PayloadAction<SCHEDULE>) => {
      state.scheduleBooking = action.payload;
      return state;
    },
    show: (state, action: PayloadAction<SCHEDULE>) => {
      state.scheduleBooking = action.payload;
      return state;
    },
    setPaginate: (
      state,
      action: PayloadAction<SCHEDULE_PAYLOAD["pagingParams"]>
    ) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = scheduleSlice.actions;

// Export the reducer to be included in the store
export default scheduleSlice.reducer;
