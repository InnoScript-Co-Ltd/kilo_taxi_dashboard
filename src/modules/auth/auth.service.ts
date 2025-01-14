import { Dispatch } from "redux";

import { postRequest } from "../../helpers/api";
import { endpoints } from "../../constants/endpoints";
import { httpServiceHandler } from "../../helpers/handler";
import { getData, setData } from "../../helpers/localStorage";
import { keys } from "../../constants/config";
import { checkRefreshToken } from "../../shares/shareSlice";
import http from "../../constants/axios";
import axios from "axios";

export const authService = {
  store: async (payload: any, dispatch: Dispatch) => {
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
  RefreshToken: async (
    currentAccessToken: string,
    currentRefreshToken: string
  ) => {
    try {
      const response = await axios.post(
        `https://localhost:7181/api/v1/Auth/refresh-token`,
        {
          accessToken: currentAccessToken,
          refreshToken: currentRefreshToken,
        }
      );
      return response.data; // { accessToken, refreshToken }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error refreshing token:",
          error.response?.data || error.message
        );
      } else {
        console.error("An unexpected error occurred:", error);
      }
      throw error; // Re-throw the error for further handling
    }
  },

  // refreshToken: async (dispatch: Dispatch) => {
  //   const payload = {
  //     accessToken: getData(keys.API_TOKEN),
  //     refreshToken: getData(keys.REFRESH_TOKEN),
  //   };

  //   console.log(payload);

  //   // const response = await axios.post(
  //   //   "http://localhost:5112/api/v1/Auth/refresh-token",
  //   //   payload,
  //   //   {
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //       Accept: "*/*",
  //   //     },
  //   //   }
  //   // );

  //   const response = await axios.post(
  //     "https://localhost:7181/api/v1/Auth/refresh-token",
  //     {
  //       accessToken: getData(keys.API_TOKEN),
  //       refreshToken: getData(keys.REFRESH_TOKEN),
  //     }
  //     // {
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //     Accept: "*/*",
  //     //   },
  //     // }
  //   );

  // if (response.status === 200) {
  //   setData(keys.API_TOKEN, response.data.accessToken);
  //   setData(keys.REFRESH_TOKEN, response.data.refreshToken);
  //   dispatch(checkRefreshToken(false));
  // } else {
  //   dispatch(checkRefreshToken(true));
  // }

  // return response;
  // },
};
