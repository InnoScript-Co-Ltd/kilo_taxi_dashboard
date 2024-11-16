import { createSlice } from "@reduxjs/toolkit";
import { VEHICLE, VEHICLE_PAYLOAD, vehiclePayload } from "./vehicle.payload"; // Ensure proper import paths

// Define a type for pagination parameters
export interface VEHICLE_PAGINATE_PARAMS
  extends Pick<VEHICLE_PAYLOAD, "pagingParams"> {}

// Define a type for the vehicle slice
export interface VEHICLE_SLICE {
  data: {
    vehicles: Array<VEHICLE>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  vehicle: null | VEHICLE;
  pagingParams: VEHICLE_PAYLOAD["pagingParams"];
}

// Initial state for the vehicle slice
const initialState: VEHICLE_SLICE = {
  data: {
    vehicles: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  vehicle: null,
  pagingParams: vehiclePayload.pagingParams,
};

// Create the vehicle slice
const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    update: (state, action) => {
      state.vehicle = action.payload;
      return state;
    },
    show: (state, action) => {
      state.vehicle = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = vehicleSlice.actions;

// Export the reducer to be included in the store
export default vehicleSlice.reducer;
