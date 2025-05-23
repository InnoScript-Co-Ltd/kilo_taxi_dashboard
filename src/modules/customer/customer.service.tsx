import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index, show, update } from "./customer.slice";

export const customerService = {
  store: async (payload: any, dispatch: Dispatch, notifications: any) => {
    const response: any = await postRequest(
      endpoints.customer,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data?.statusCode === 201) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("Customer is created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response.data;
  },

  index: async (dispatch: Dispatch, params: any, notifications: any) => {
    const response: any = await getRequest(
      endpoints.customer,
      params,
      dispatch
    );

    await httpServiceHandler(dispatch, response.data, notifications);

    if (response.data?.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      console.log("customer:", response);
      notifications.show("Customer list is successfully retrieved!", {
        severity: "info",
        autoHideDuration: 3000,
      });
      dispatch(
        index(response.data.payload ? response.data.payload : response.data)
      );
    }
    return response.data;
  },
  deleted: async (dispatch: Dispatch, params: any, notifications: any) => {
    const response: any = await getRequest(
      endpoints.customer + "/deletedList",
      params,
      dispatch
    );

    await httpServiceHandler(dispatch, response.data, notifications);

    if (response.data?.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      console.log("customer:", response);
      notifications.show("Customer list is successfully retrieved!", {
        severity: "info",
        autoHideDuration: 3000,
      });
      dispatch(
        index(response.data.payload ? response.data.payload : response.data)
      );
    }
    return response.data;
  },

  update: async (
    dispatch: Dispatch,
    id: number,
    payload: any,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.customer}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response);
    console.log("customer", response);
    if (response.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications?.show("Customer is updated successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
      dispatch(update(response.data));
    }
    return response.data;
  },

  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(
      `${endpoints.customer}/${id}`,
      null,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data.payload);

    if (response.data?.statusCode === 200) {
      dispatch(show(response.data.payload));
    }

    return response.data;
  },
};
