import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { SosFormInputs } from "./sos.payload";
import { index, show } from "./sos.slice";

export const sosService = {

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

   // Method to solve an SOS request by ID
   solve: async (dispatch: Dispatch, id: number, notifications?: any) => {
    const response: any = await putRequest(
      `${endpoints.sos}/solve/${id}`,
      null,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 200) {
      notifications.show("SOS request solved successfully!", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response.data;
  },
};
