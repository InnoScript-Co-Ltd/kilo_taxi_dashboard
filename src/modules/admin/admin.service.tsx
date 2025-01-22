import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { AdminFormInputs } from "./admin.payload";
import { index, show, update } from "./admin.slice";

export const adminService = {
  store: async (payload: any, dispatch: Dispatch, notifications: any) => {
    const response: any = await postRequest(endpoints.admin, payload, dispatch);
    await httpServiceHandler(dispatch, response);
    if (response.data.statusCode === 201) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("Admin is created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response.data;
  },

  index: async (dispatch: Dispatch, params: any, notifications: any) => {
    const response: any = await getRequest(endpoints.admin, params, dispatch);
    await httpServiceHandler(dispatch, response.data, notifications);
    if (response.data.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("Admin list is successfully retrieved!", {
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

  update: async (
    dispatch: Dispatch,
    id: number,
    payload: AdminFormInputs,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.admin}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications?.show("Admin is updated successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
      dispatch(update(response.data));
    }
    return response.data;
  },

  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(
      `${endpoints.admin}/${id}`,
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
