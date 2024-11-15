import { createSlice } from "@reduxjs/toolkit";

export interface SHARE_SLICE {
      errors: null | any,
      showSidebar: boolean,
      statusFilter: string,
      startFilterDate: null | any,
      endFilterDate: null | any
}

const initialState: SHARE_SLICE = {
    errors: null,
    showSidebar: false,
    statusFilter: "ALL",
    startFilterDate: null,
    endFilterDate: null,
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
    }
  },
});

export const {
  // updateNotification,
  updateError,
  sidebarToggle,
  setStatusFilter,
  setDateFilter
} = shareSlice.actions;
export default shareSlice.reducer;
