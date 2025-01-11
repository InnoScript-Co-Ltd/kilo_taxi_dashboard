import { createSlice } from "@reduxjs/toolkit";
import { getData } from "../helpers/localStorage";

export interface SHARE_SLICE {
      errors: null | any,
      showSidebar: boolean,
      statusFilter: string,
      startFilterDate: null | any,
      endFilterDate: null | any,
      refreshToken: boolean
}

const initialState: SHARE_SLICE = {
    errors: null,
    showSidebar: false,
    statusFilter: "ALL",
    startFilterDate: null,
    endFilterDate: null,
    refreshToken: false
  };

const shareSlice = createSlice({
  name: "share",
  initialState,
  reducers: {
    // updateNotification: (state, action) => {
    //   switch (action.payload.show) {        
    //     case true:    
    //       state.notification.variant = action.payload.variant;
    //       state.notification.msg = action.payload.msg;
    //       state.notification.show = action.payload.show;
    //       return state;
    //     case false:
    //       return {
    //         ...state,
    //         show: false,
    //       };
    //     default:
    //       return state;
    //   }
    // },
    updateError: (state, action) => {
      state.errors = { ...action.payload };
      return state;
    },
    sidebarToggle: (state) => {
      state.showSidebar = !state.showSidebar;
      return state;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
      return state;
    },
    setDateFilter: (state,action) => {
        state.startFilterDate = action.payload.startDate;
        state.endFilterDate = action.payload.endDate;
        return state;
    },
    checkRefreshToken: (state,action) => {
      state.refreshToken = action.payload;
      return state
    }
  },
});

export const {
  // updateNotification,
  updateError,
  sidebarToggle,
  setStatusFilter,
  setDateFilter,
  checkRefreshToken
} = shareSlice.actions;
export default shareSlice.reducer;
