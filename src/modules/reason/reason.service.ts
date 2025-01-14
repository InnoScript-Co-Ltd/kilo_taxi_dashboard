import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { ReasonFormInputs } from "./reason.payload";
import { index, show, update } from "./reason.slice";

export const reasonService = {
  // Method to create a new reason
  store: async (
    payload: ReasonFormInputs,
    dispatch: Dispatch,
    notifications?: any
  ) => {
    const response: any = await postRequest(endpoints.reason, payload, dispatch);
    await httpServiceHandler(dispatch, response);

    if (response.status === 201) {
      //'info' | 'success' | 'warning' | 'error'
      console.log("error here");
      notifications.show("Reason is created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response;
  },

  // Method to retrieve a list of reasons with optional parameters
  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(endpoints.reason, params, dispatch);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("Reason list is successfully retrieved!", {
        severity: "info",
        autoHideDuration: 3000,
      });
      dispatch(index(response.data ? response.data : response.data));
    }
    return response;
  },

  // Method to update an existing reason by ID
  update: async (
    dispatch: Dispatch,
    id: number,
    payload: ReasonFormInputs,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.reason}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications?.show("Reason is updated successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
      dispatch(update(response.data));
    }
    return response;
  },

  // Method to fetch details of a specific reason by ID
  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(`${endpoints.reason}/${id}`, null, dispatch);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(show(response.data));
    }
    return response;
  },
};
