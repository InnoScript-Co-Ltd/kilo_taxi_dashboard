import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { ExtraDemandFormInputs } from "./extraDemand.payload";
import { index, show, update } from "./extraDemand.slice";

export const extraDemandService = {
  // Method to create a new extraDemand
  store: async (
    payload: ExtraDemandFormInputs,
    dispatch: Dispatch,
    notifications?: any
  ) => {
    try {
      const response: any = await postRequest(
        endpoints.extraDemand,
        payload,
        dispatch
      );
      await httpServiceHandler(dispatch, response);

      if (response.data.statusCode === 201) {
        //'info' | 'success' | 'warning' | 'error'
        console.log("error here");
        notifications.show("ExtraDemand is created successfully", {
          severity: "success",
          autoHideDuration: 3000,
        });
      }
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating ExtraDemand:",
        error.response?.data || error.message
      );
      if (notifications) {
        notifications.show("Failed to create ExtraDemand. Check the inputs.", {
          severity: "error",
          autoHideDuration: 3000,
        });
      }
      throw error; // Ensure the caller knows the operation failed
    }
  },

  // Method to retrieve a list of extraDemands with optional parameters
  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(
      endpoints.extraDemand,
      params,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("ExtraDemand list is successfully retrieved!", {
        severity: "info",
        autoHideDuration: 3000,
      });
      dispatch(
        index(
          response.data.payload ? response.data.payload : response.data.payload
        )
      );
    }
    return response.data;
  },

  // Method to update an existing extraDemand by ID
  update: async (
    dispatch: Dispatch,
    id: number,
    payload: ExtraDemandFormInputs,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.extraDemand}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications?.show("ExtraDemand is updated successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
      dispatch(update(response.data));
    }
    return response.data;
  },

  // Method to fetch details of a specific extraDemand by ID
  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(
      `${endpoints.extraDemand}/${id}`,
      null,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data.payload);

    if (response.status === 200) {
      dispatch(show(response.data.payload));
    }
    return response.data;
  },
};
