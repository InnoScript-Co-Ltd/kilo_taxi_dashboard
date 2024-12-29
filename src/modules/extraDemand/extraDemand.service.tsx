import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index, show } from "./extraDemand.slice";

export const extraDemandService = {
  // Method to fetch the list of extraDemands
  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(endpoints.extraDemand, params);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("ExtraDemand list is successfully retrieved!", {
        severity: "info",
        autoHideDuration: 3000,
      });
      dispatch(index(response.data ? response.data : response.data));
    }
    return response;
  },

  // Method to fetch details of a specific extraDemand by ID
  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(`${endpoints.extraDemand}/${id}`, null);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(show(response.data));
    }
    return response;
  },

  store: async (payload: any, dispatch: Dispatch, notifications?: any) => {
    const response: any = await postRequest(endpoints.extraDemand, payload);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      notifications.show("ExtraDemand created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response;
  },
};
