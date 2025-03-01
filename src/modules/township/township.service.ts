import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import {
  TownshipCreateFormInputs,
  TownshipUpdateFormInputs,
} from "./township.payload";
import { index, show, update } from "./township.slice";

export const townshipService = {
  store: async (payload: any, dispatch: Dispatch, notifications?: any) => {
    const response: any = await postRequest(
      endpoints.township,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response);

    if (response.data.statusCode === 201) {
      notifications.show("Township is created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }

    return response.data;
  },

  index: async (dispatch: Dispatch, params: any) => {
    const response: any = await getRequest(
      endpoints.township,
      params,
      dispatch
    );
    await httpServiceHandler(dispatch, response);

    if (response.data.statusCode === 200) {
      dispatch(index(response.data ? response.data : response.data));
    }

    return response;
  },

  update: async (
    dispatch: Dispatch,
    id: number,
    payload: TownshipUpdateFormInputs,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.township}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response);

    if (response.data.statusCode === 200) {
      notifications?.show("Township is updated successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
      dispatch(update(response.data));
    }

    return response;
  },

  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(
      `${endpoints.township}/${id}`,
      null,
      dispatch
    );
    await httpServiceHandler(dispatch, response);

    if (response.data.statusCode === 200) {
      dispatch(show(response.data));
    }

    return response;
  },
};
