import { createSlice } from "@reduxjs/toolkit";
import { ROLE, ROLE_PAYLOAD, rolePayload } from "./role.payload";

// Define a type for pagination parameters, similar to STATE_PAGINATE_PARAMS
export interface ROLE_PAGINATE_PARAMS
  extends Pick<ROLE_PAYLOAD, "pagingParams"> {}

// Define a type for the wallet slice
export interface ROLE_SLICE {
  data: {
    roleInfoDtos: Array<ROLE>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  role: null | ROLE;
  pagingParams: ROLE_PAYLOAD["pagingParams"];
}

const initialState: ROLE_SLICE = {
  data: {
    roleInfoDtos: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  role: null,
  pagingParams: rolePayload.pagingParams,
};

// Create the wallet slice
const roleSlice = createSlice({
  name: "role",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action?.payload?.payload;
      return state;
    },
    update: (state, action) => {
      state.role = action.payload;
      return state;
    },
    show: (state, action) => {
      state.role = action.payload?.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = roleSlice.actions;

// Export the reducer to be included in the store
export default roleSlice.reducer;
