import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { PaymentChannelFormInputs } from "./paymentchannel.payload";
import { index, show, update } from "./paymentchannel.slice";

export const paymentChannelService = {
  // Method to create a new wallet
  store: async (payload: any, dispatch: Dispatch, notifications?: any) => {
    const response: any = await postRequest(endpoints.paymentChannel, payload);
    await httpServiceHandler(dispatch, response);

    if (response.status === 201) {
      //'info' | 'success' | 'warning' | 'error'
      console.log("error here");
      notifications.show("PaymentChannel is created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response;
  },

  // Method to retrieve a list of wallets with optional parameters
  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(endpoints.paymentChannel, params);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("PaymentChannel list is successfully retrieved!", {
        severity: "info",
        autoHideDuration: 3000,
      });
      dispatch(index(response.data ? response.data : response.data));
    }
    return response;
  },

  // Method to update an existing wallet by ID
  update: async (
    dispatch: Dispatch,
    id: number,
    payload: any,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.paymentChannel}/${id}`,
      payload
    );
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications?.show("PaymentChannel is updated successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
      dispatch(update(response.data));
    }
    return response;
  },

  // Method to fetch details of a specific wallet by ID
  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(
      `${endpoints.paymentChannel}/${id}`,
      null
    );
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(show(response.data));
    }
    return response;
  },
};
