import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { WithDrawTransactionFormInputs } from "./withDrawTransaction.payload";
import { index, show, update } from "./withDrawTransaction.slice";

export const withDrawTransactionService = {
  // Method to create a new wallet
  store: async (
    payload: WithDrawTransactionFormInputs,
    dispatch: Dispatch,
    notifications?: any
  ) => {
    const response: any = await postRequest(
      endpoints.withDrawTransaction,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 201) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("Wallet is created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response.data;
  },

  // Method to retrieve a list of wallets with optional parameters
  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(
      endpoints.withDrawTransaction,
      params,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show(
        "WithDrawTransaction list is successfully retrieved!",
        {
          severity: "info",
          autoHideDuration: 3000,
        }
      );
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
    payload: any,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.withDrawTransaction}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response);

    if (response.data.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications?.show("WithDrawTransaction is updated successfully", {
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
      `${endpoints.withDrawTransaction}/${id}`,
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
