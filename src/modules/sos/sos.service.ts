import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { SosFormInputs } from "./sos.payload";
import { index, show, update } from "./sos.slice";

export const sosService = {
  // Method to create a new wallet
  store: async (
    payload: SosFormInputs,
    dispatch: Dispatch,
    notifications?: any
  ) => {
    const response: any = await postRequest(
      endpoints.paymentChannel,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 201) {
      //'info' | 'success' | 'warning' | 'error'
      console.log("error here");
      notifications.show("Sos is created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response.data;
  },

  // Method to retrieve a list of wallets with optional parameters
  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(endpoints.sos, params, dispatch);
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("Sos list is successfully retrieved!", {
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

  // Method to update an existing wallet by ID
  update: async (
    dispatch: Dispatch,
    id: number,
    payload: SosFormInputs,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.sos}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.status === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications?.show("PaymentChannel is updated successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
      dispatch(update(response.data));
    }
    return response.data;
  },

  // Method to fetch details of a specific wallet by ID
  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(
      `${endpoints.sos}/${id}`,
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
