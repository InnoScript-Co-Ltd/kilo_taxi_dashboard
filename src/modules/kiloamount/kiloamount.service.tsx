import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index, show, update } from "./kiloamount.slice";
import { KiloAmountFormInputs } from "./kiloamount.payload";

export const kiloAmountService = {
  store: async (payload: any, dispatch: Dispatch, notifications?: any) => {
    const response: any = await postRequest(
      endpoints.kiloAmount,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 201) {
      notifications.show("KiloAmount created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response.data;
  },

  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(
      endpoints.kiloAmount,
      params,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    console.log(response);

    if (response.data.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("KiloAmount list successfully retrieved!", {
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
    payload: KiloAmountFormInputs,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.kiloAmount}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 200) {
      notifications?.show("KiloAmount updated successfully", {
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
      `${endpoints.kiloAmount}/${id}`,
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
