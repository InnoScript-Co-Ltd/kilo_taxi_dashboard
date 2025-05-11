import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CONFIGSETTING,
  CONFIGSETTING_PAYLOAD,
  configSettingPayload,
} from "./configsetting.payload";

// Define a type for the state slice, similar to CITY_SLICE
export interface CONFIGSETTING_SLICE {
  data: {
    configSettings: CONFIGSETTING[];
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  configSetting: null | CONFIGSETTING;
  pagingParams: CONFIGSETTING_PAYLOAD["pagingParams"];
}

const initialState: CONFIGSETTING_SLICE = {
  data: {
    configSettings: [],
    paging: {
      totalCount: 0,
      totalPages: 0,
      previousPage: null,
      nextPage: 0,
      firstRowOnPage: 0,
      lastRowOnPage: 0,
    },
  },
  configSetting: null,
  pagingParams: configSettingPayload.pagingParams,
};

// Create the state slice
const configSettingSlice = createSlice({
  name: "configSetting",
  initialState: initialState,
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    show: (state, action: PayloadAction<CONFIGSETTING>) => {
      state.configSetting = action.payload;
      return state;
    },
    update: (state, action: PayloadAction<CONFIGSETTING>) => {
      state.configSetting = action.payload;
      return state;
    },
    setPaginate: (
      state,
      action: PayloadAction<CONFIGSETTING_PAYLOAD["pagingParams"]>
    ) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

// Export actions for use in components
export const { index, update, show, setPaginate } = configSettingSlice.actions;

// Export the reducer to be included in the store
export default configSettingSlice.reducer;
