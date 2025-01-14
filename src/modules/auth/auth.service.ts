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

    // const response = await axios.post(
    //   "http://localhost:5112/api/v1/Auth/refresh-token",
    //   payload,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "*/*",
    //     },
    //   }
    // );

    const response = await axios.post(
      "http://localhost:5112/api/v1/Auth/refresh-token",
      {
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGVtYWlsIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdEBlbWFpbCIsImp0aSI6ImJhNGIzZWQ4LTMzNmQtNGQ2Yi05Yjk3LTk5NzU4NzVjYzJkNSIsImV4cCI6MTczNjYwMzQ4NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo3MTgxIiwiYXVkIjoidGVzdCJ9.qozePPDfY9BVcU7yg0FSNT73oPaqYTpsz8fcdf2SWuw", // Hardcoded token
        refreshToken:
          "rYiLp1GNCplKgEmn14lWTyCIKm0WulP4e1sWqa71wpnAB++4N0Ot6CQ7iZ/Oca8M5/sy6DfoLXrB2iC61I6mrg==", // Hardcoded token
      },
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
