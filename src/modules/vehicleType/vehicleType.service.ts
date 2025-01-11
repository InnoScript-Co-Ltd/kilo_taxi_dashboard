import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { VehicleTypeFormInputs } from "./vehicleType.payload";
import { index, show, update } from "./vehicleType.slice";

export const vehicleTypeService = {
  store: async (payload: any, dispatch: Dispatch, notifications?: any) => {
    const response: any = await postRequest(endpoints.vehicleType, payload, dispatch);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      notifications.show("Vehicle Type created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response;
  },

  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(endpoints.vehicleType, params, dispatch);
    await httpServiceHandler(dispatch, response);
    if (response.status === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("Vehicle Type list successfully retrieved!", {
        severity: "info",
        autoHideDuration: 3000,
      });
      dispatch(index(response.data ? response.data : response.data));
    }
    return response;
  },

  // Method to update an existing state by ID
  update: async (
    dispatch: Dispatch,
    id: number,
    payload: VehicleTypeFormInputs,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.vehicleType}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      notifications?.show("Vehicle Type updated successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
      dispatch(update(response.data));
    }
    return response;
  },

  // Method to fetch details of a specific state by ID
  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(
      `${endpoints.vehicleType}/${id}`,
      null,
      dispatch
    );
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(show(response.data));
    }

    return response;
  },
};
