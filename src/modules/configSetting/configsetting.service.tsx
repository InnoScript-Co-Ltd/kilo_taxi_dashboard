import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index, show, update } from "./configsetting.slice";
import { ConfigSettingFormInputs } from "./configsetting.payload";

export const configSettingService = {
  store: async (payload: any, dispatch: Dispatch, notifications?: any) => {
    const response: any = await postRequest(
      endpoints.commissionConfig,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 201) {
      notifications.show("ConfigSetting created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response.data;
  },

  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(
      endpoints.commissionConfig,
      params,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    console.log(response);

    if (response.data?.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("ConfigSetting list successfully retrieved!", {
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

  // Method to update an existing state by ID
  update: async (
    dispatch: Dispatch,
    id: number,
    payload: ConfigSettingFormInputs,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.commissionConfig}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 200) {
      notifications?.show("ConfigSetting updated successfully", {
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
      `${endpoints.commissionConfig}/${id}`,
      null,
      dispatch
    );
    console.log("data :", response.data);

    await httpServiceHandler(dispatch, response.data.payload);

    if (response.data?.statusCode === 200) {
      dispatch(show(response.data.payload));
    }

    return response.data;
  },
};
