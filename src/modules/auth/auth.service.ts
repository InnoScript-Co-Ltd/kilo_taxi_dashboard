import { Dispatch } from "redux";

import { postRequest } from "../../helpers/api";
import { endpoints } from "../../constants/endpoints";
import { httpServiceHandler } from "../../helpers/handler";
import { getData, removeAllData, setData } from "../../helpers/localStorage";
import { keys } from "../../constants/config";
import { checkRefreshToken } from "../../shares/shareSlice";
import http from "../../constants/axios";
import axios from "axios";

export const authService = {
  store: async (payload: any, dispatch: Dispatch) => {
    const jsonPayload = JSON.stringify(payload);
    console.log(jsonPayload);

    const response: any = await postRequest(
      endpoints.authLogin,
      payload,
      dispatch
    );
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      setData(keys.API_TOKEN, response.data.accessToken);
      setData(keys.REFRESH_TOKEN, response.data.refreshToken);
      console.log(response);
    }
    return response;
  },
  logout: async (dispatch: Dispatch) => {
    const response = await postRequest(endpoints.authLogout, null, dispatch);
    if (response.status === 200) {
      removeAllData();
      window.location.reload();
    }
  },
  refreshToken: async (dispatch: Dispatch) => {
    const payload = {
      accessToken: getData(keys.API_TOKEN),
      refreshToken: getData(keys.REFRESH_TOKEN),
    };

    console.log(payload);

    const response = await axios.post(
      "http://localhost:5112/api/v1/Auth/refresh-token",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );

    if (response.status === 200) {
      setData(keys.API_TOKEN, response.data.accessToken);
      setData(keys.REFRESH_TOKEN, response.data.refreshToken);
      dispatch(checkRefreshToken(false));
    } else {
      dispatch(checkRefreshToken(true));
    }

    return response;
  },
};
