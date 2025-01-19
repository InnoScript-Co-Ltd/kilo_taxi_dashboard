import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { VehicleTypeFormInputs } from "./vehicleType.payload";
import { index, show, update } from "./vehicleType.slice";

export const vehicleTypeService = {
  store: async (payload: any, dispatch: Dispatch, notifications: any) => {
    console.log("payload:", payload);

    const response: any = await postRequest(
      endpoints.vehicleType,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 201) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("VehicleType is created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response.data;
  },

  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(
      endpoints.vehicleType,
      params,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);
    if (response.status === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("Vehicle Type list successfully retrieved!", {
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
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 200) {
      notifications?.show("Vehicle Type updated successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
      dispatch(update(response.data));
    }
    return response.data;
  },

  // Method to fetch details of a specific state by ID
  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(
      `${endpoints.vehicleType}/${id}`,
      null,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data.payload);

    if (response.data.statusCode === 200) {
      dispatch(show(response.data.payload));
    }

    return response.data;
  },
};
