import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { CityCreateFormInputs, CityUpdateFormInputs } from "./city.payload";
import { index, show, update } from "./city.slice";

export const cityService = {
  store: async (
    payload: CityCreateFormInputs,
    dispatch: Dispatch,
    notifications?: any
  ) => {
    const response: any = await postRequest(endpoints.city, payload, dispatch);
    await httpServiceHandler(dispatch, response, notifications);

    if (response.statusCode === 201) {
      notifications.show("City is created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }

    return response;
  },

  index: async (dispatch: Dispatch, params: any) => {
    const response: any = await getRequest(endpoints.city, params, dispatch);
    await httpServiceHandler(dispatch, response.data);
    if (response.data.statusCode === 200) {
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
    payload: CityUpdateFormInputs,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.city}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      notifications?.show("City is updated successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
      dispatch(update(response.data));
    }

    return response;
  },

  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(
      `${endpoints.city}/${id}`,
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
