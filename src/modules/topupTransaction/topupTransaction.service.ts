import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { TopupTransactionFormInputs } from "./topupTransaction.payload";
import { index, show, update } from "./topupTransaction.slice";

export const topupTransactionService = {
  // Method to create a new topupTransaction
  store: async (
    payload: TopupTransactionFormInputs,
    dispatch: Dispatch,
    notifications?: any
  ) => {
    const response: any = await postRequest(endpoints.topupTransaction, payload, dispatch);
    await httpServiceHandler(dispatch, response);

    if (response.status === 201) {
      //'info' | 'success' | 'warning' | 'error'
      console.log("error here");
      notifications.show("TopupTransaction is created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response;
  },

  // Method to retrieve a list of topupTransactions with optional parameters
  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(endpoints.topupTransaction, params, dispatch);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("TopupTransaction list is successfully retrieved!", {
        severity: "info",
        autoHideDuration: 3000,
      });
      dispatch(index(response.data ? response.data : response.data));
    }
    return response;
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
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications?.show("TopupTransaction is updated successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
      dispatch(update(response.data));
    }
    return response;
  },

  // Method to fetch details of a specific topupTransaction by ID
  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(`${endpoints.topupTransaction}/${id}`, null, dispatch);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(show(response.data));
    }
    return response;
  },
};
