import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { TopupTransactionFormInputs } from "./topupTransaction.payload";
import { index, show, update } from "./topupTransaction.slice";
import { HTTPErrorResponse, HTTPResponse } from "../../constants/config";

export const topupTransactionService = {
  // Method to create a new topupTransaction
  store: async (
    payload: any,
    dispatch: Dispatch,
    notifications?: any
  ) => {
    const response: any = await postRequest(endpoints.topupTransaction, payload, dispatch);
    await httpServiceHandler(dispatch, response);

    if (response.data.statusCode === 201) {
      //'info' | 'success' | 'warning' | 'error'
      console.log("error here");
      notifications.show("TopupTransaction is created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response.data;
  },

  // Method to retrieve a list of topupTransactions with optional parameters
  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(endpoints.topupTransaction, params, dispatch);
    await httpServiceHandler(dispatch, response.data);
    console.log("Before Sevice:"+ response);
    if (response.data.statusCode === 200) {
      console.log("Sevice:"+ response.data);
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("TopupTransaction list is successfully retrieved!", {
        severity: "info",
        autoHideDuration: 3000,
      });

      dispatch(index(response.data.payload ? response.data.payload : response.data.payload));
    }
    return response.data;
  },

  // Method to update an existing topupTransaction by ID
  update: async (
    dispatch: Dispatch,
    id: number,
    payload: TopupTransactionFormInputs,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.topupTransaction}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications?.show("TopupTransaction is updated successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
      dispatch(update(response.data));
    }
    return response.data;
  },

  // Method to fetch details of a specific topupTransaction by ID
  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(`${endpoints.topupTransaction}/${id}`, null, dispatch);
    await httpServiceHandler(dispatch, response.data.payload);

    if (response.data.statusCode === 200) {
      dispatch(show(response.data.payload));
    }
    return response.data;
  },

   // Fetch Payment Channel Names
   fetchPaymentChannelNames: async (dispatch: Dispatch) => {
    try {
      const response: any = await getRequest(
        `${endpoints.paymentChannel}/payment-channel-Names`,
        null,
        dispatch
      );
      if (response?.status === 200) {
        return response.data.payload || response.data;
      }
    } catch (error) {
      console.error("Error fetching payment channels:", error);
      return [];
    }
  },
   // Fetch Driver Details
   fetchDriverDetails: async (
    dispatch: Dispatch,
    phoneNumber?: string,
    driverId?: number,

    notifications?: any
  ): Promise<{ driverName: string; walletBalance: number; driverId: number; phoneNumber: string } | null> => {
    try {
      const params: { [key: string]: any } = {};
      if (phoneNumber) params.phone = phoneNumber;
      if (driverId) params.id = driverId;

      const response: HTTPResponse | HTTPErrorResponse | undefined = await getRequest(
        `${endpoints.driver}/GetDriverDetails`,
        params,
        dispatch
      );

      // Check if the response is a success response (HTTPResponse)
      if ((response as HTTPResponse)?.status === 200) {
        return {
          driverId: (response as HTTPResponse).data.id,
          phoneNumber: (response as HTTPResponse).data.phoneNumber,
          driverName: (response as HTTPResponse).data.driverName,
          walletBalance: (response as HTTPResponse).data.balance,
        };
      } else {
        notifications?.show("Driver not found.", { severity: "error", autoHideDuration: 3000 });
        return null;
      }
    } catch (error) {
      notifications?.show("Failed to fetch driver details.", {
        severity: "error",
        autoHideDuration: 3000,
      });
      return null;
    }
  },
};
