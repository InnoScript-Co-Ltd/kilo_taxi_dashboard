import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { ScheduleBookingFormInputs } from "./scheduleBooking.payload";
import { index, show, update } from "./scheduleBooking.slice";

export const scheduleBookingService = {
  // Method to create a new state
  store: async (
    payload: ScheduleBookingFormInputs,
    dispatch: Dispatch,
    notifications?: any
  ) => {
    const response: any = await postRequest(
      endpoints.scheduleBooking,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 201) {
      notifications.show("Schedule is created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response.data;
  },

  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(
      endpoints.order + "/Schedule-Orders",
      params,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);
    if (response.data.statusCode === 200) {
      console.log(response);
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("SchehuleBooking list is successfully retrieved!", {
        severity: "info",
        autoHideDuration: 3000,
      });
      dispatch(
        index(response.data.payload ? response.data.payload : response.data)
      );
    }
    return response.data;
  },

  // Method to update an existing state by ID
  update: async (
    dispatch: Dispatch,
    id: number,
    payload: ScheduleBookingFormInputs,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.scheduleBooking}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response);

    if (response.data.statusCode === 200) {
      notifications?.show("Schedule is updated successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
      dispatch(update(response.data.payload));
    }
    return response.data;
  },

  // Method to fetch details of a specific state by ID
  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(
      `${endpoints.order}/${id}`,
      null,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data.payload);

    if (response.status === 200) {
      dispatch(show(response.data.payload));
    }

    return response.data.payload;
  },
};
