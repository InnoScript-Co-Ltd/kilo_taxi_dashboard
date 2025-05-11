import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index, show } from "./order.slice";
import { OrderFormInputs } from "./order.payload";

export const orderService = {
  // Method to fetch the list of orders
  index: async (dispatch: Dispatch, params: any, notifications?: any) => {
    const response: any = await getRequest(endpoints.order, params, dispatch);
    await httpServiceHandler(dispatch, response.data);
    console.log(response);

    if (response?.data?.statusCode === 200) {
      //'info' | 'success' | 'warning' | 'error'
      notifications.show("Order list is successfully retrieved!", {
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

  // Method to fetch details of a specific order by ID
  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(
      `${endpoints.order}/${id}`,
      null,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data.payload);

    if (response.status === 200) {
      dispatch(show(response.data.payload));
    }
    return response.data;
  },

  store: async (payload: any, dispatch: Dispatch, notifications?: any) => {
    const response: any = await postRequest(endpoints.order, payload, dispatch);

    await httpServiceHandler(dispatch, response.data, notifications);

    if (response?.data?.statusCode === 200) {
      notifications?.show("Order created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }
    return response.data;
  },
};
