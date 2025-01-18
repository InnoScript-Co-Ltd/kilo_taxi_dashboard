import { Dispatch } from "redux";

import { postRequest } from "../../helpers/api";
import { endpoints } from "../../constants/endpoints";
import { httpServiceHandler } from "../../helpers/handler";
import { setData } from "../../helpers/localStorage";
import { keys } from "../../constants/config";
import axios from "axios";

const API_URL = "https://localhost:7181/api/v1/";

export const authService = {
  store: async (payload: any, dispatch: Dispatch) => {
    const response: any = await postRequest(endpoints.authLogin, payload);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      console.log(response.data.accessToken);
      setData(keys.API_TOKEN, response.data.accessToken);
      setData(keys.REFRESH_TOKEN, response.data.refreshToken);
      console.log(response);
    }
    return response;
  },
};
export const refreshToken = async (currentRefreshToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/Auth/refresh-token`, {
      refreshToken: currentRefreshToken,
    });
    return response.data; // { accessToken, refreshToken }
  } catch (error) {
    // Narrowing down the type of error
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
};
