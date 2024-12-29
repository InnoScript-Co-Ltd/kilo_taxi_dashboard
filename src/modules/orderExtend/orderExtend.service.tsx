import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index, show } from "./orderExtend.slice";

export const orderExtendService = {
  // Method to fetch the list of orderExtends
  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(endpoints.orderExtend, params);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("OrderExtend list is successfully retrieved!", {
        severity: "info",
        autoHideDuration: 3000,
      });
      dispatch(index(response.data ? response.data : response.data));
    }
    return response;
  },

  // Method to fetch details of a specific orderExtend by ID
  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(`${endpoints.orderExtend}/${id}`, null);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(show(response.data));
    }
    return response;
  },

  // store: async (payload: any, dispatch: Dispatch, notifications?: any) => {
  //   const response: any = await postRequest(endpoints.orderExtend, payload);
  //   await httpServiceHandler(dispatch, response);

  //   if (response.status === 200) {
  //     notifications.show("OrderExtend created successfully", {
  //       severity: "success",
  //       autoHideDuration: 3000,
  //     });
  //   }
  //   return response;
  // },
};
