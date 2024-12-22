import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  VEHICLE_TYPE,
  VEHICLE_TYPE_PAYLOAD,
  vehicleTypePayload,
} from "./vehicleType.payload";

// Define a type for the state slice, similar to CITY_SLICE
export interface VEHICLE_TYPE_SLICE {
  data: {
    vehicleTypes: Array<any>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  vehicleTypes: null | VEHICLE_TYPE;
  pagingParams: VEHICLE_TYPE_PAYLOAD["pagingParams"];
}

const initialState: VEHICLE_TYPE_SLICE = {
  data: {
    vehicleTypes: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  vehicleTypes: null,
  pagingParams: vehicleTypePayload.pagingParams,
};

// Create the state slice
const vehicleTypeSlice = createSlice({
  name: "vehicleType",
  initialState: initialState,
  reducers: {
    index: (
      state,
      action: PayloadAction<{ vehicleTypes: VEHICLE_TYPE[]; paging: any }>
    ) => {
      state.data = action.payload;
      return state;
    },
    show: (state, action: PayloadAction<VEHICLE_TYPE>) => {
      state.vehicleTypes = action.payload;
      return state;
    },
    update: (state, action: PayloadAction<VEHICLE_TYPE>) => {
      state.vehicleTypes = action.payload;
      return state;
    },
    setPaginate: (
      state,
      action: PayloadAction<VEHICLE_TYPE_PAYLOAD["pagingParams"]>
    ) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = vehicleTypeSlice.actions;

// Export the reducer to be included in the store
export default vehicleTypeSlice.reducer;
