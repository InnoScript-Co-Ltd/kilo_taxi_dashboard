import { Dispatch } from "redux";
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { RoleCreateFormInputs, RoleUpdateFormInputs } from "./role.payload";
import { index, show, update } from "./role.slice";

export const roleService = {
  store: async (
    payload: RoleCreateFormInputs,
    dispatch: Dispatch,
    notifications?: any
  ) => {
    const response: any = await postRequest(endpoints.role, payload, dispatch);
    await httpServiceHandler(dispatch, response, notifications);

    if (response.statusCode === 201) {
      notifications.show("Role is created successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    }

    return response;
  },

  index: async (dispatch: Dispatch, params: any) => {
    const response: any = await getRequest(endpoints.role, params, dispatch);
    await httpServiceHandler(dispatch, response.data);
    if (response.status === 200) {
      console.log(response.data);
      dispatch(index(response.data ? response.data : response.data));
    }
    return response.data;
  },

  update: async (
    dispatch: Dispatch,
    id: number,
    payload: RoleUpdateFormInputs,
    notifications?: any
  ) => {
    const response: any = await putRequest(
      `${endpoints.role}/${id}`,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      notifications?.show("Role is updated successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
      dispatch(update(response.data));
    }

    return response;
  },

  show: async (dispatch: Dispatch, id: number) => {
    const response: any = await getRequest(
      `${endpoints.role}/${id}`,
      null,
      dispatch
    );
    await httpServiceHandler(dispatch, response.data);

    if (response.status === 200) {
      dispatch(show(response.data));
    }

    return response.data;
  },
};
