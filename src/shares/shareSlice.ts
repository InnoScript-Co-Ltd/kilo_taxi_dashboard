import { createSlice } from "@reduxjs/toolkit";
import { getData } from "../helpers/localStorage";

interface Location {
  vehicleId: string; // Send as string
  lat: any; // Send as string
  long: any;
}

export interface SHARE_SLICE {
  errors: null | any;
  showSidebar: boolean;
  statusFilter: string;
  startFilterDate: null | any;
  endFilterDate: null | any;
  signal: Location;
  refreshToken: boolean;
}

const initialState: SHARE_SLICE = {
  errors: null,
  showSidebar: false,
  statusFilter: "ALL",
  startFilterDate: null,
  endFilterDate: null,
  signal: {
    vehicleId: "1", // Send as string
    lat: "", // Send as string
    long: "",
  },
  refreshToken: false,
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
    setDateFilter: (state, action) => {
      state.startFilterDate = action.payload.startDate;
      state.endFilterDate = action.payload.endDate;
      return state;
    },
    setSignal: (state, action) => {
      state.signal = action.payload;
      return state;
    },
    checkRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      return state;
    },
  },
});

export const {
  // updateNotification,
  updateError,
  sidebarToggle,
  setStatusFilter,
  setDateFilter,
  setSignal,
  checkRefreshToken,
} = shareSlice.actions;
export default shareSlice.reducer;
