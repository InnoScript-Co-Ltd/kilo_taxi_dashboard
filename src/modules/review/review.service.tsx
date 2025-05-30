import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index, show, update } from "./review.slice";
import { ReviewFormInputs } from "./review.payload";

export const reviewService = {
  // Method to create a new state
  store: async (payload: any, dispatch: Dispatch, notifications?: any) => {
    const response: any = await postRequest(
      endpoints.review,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 201) {
      notifications.show("Review created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response.data;
  },

  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(endpoints.review, params, dispatch);
    await httpServiceHandler(dispatch, response.data);
    if (response.data.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("Review list successfully retrieved!", {
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
    payload: ReviewFormInputs,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.review}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.data.statusCode === 200) {
      notifications?.show("Review updated successfully", {
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
      `${endpoints.review}/${id}`,
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
