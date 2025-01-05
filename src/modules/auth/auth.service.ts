import { Dispatch } from "redux";

import { postRequest } from "../../helpers/api";
import { endpoints } from "../../constants/endpoints";
import { httpServiceHandler } from "../../helpers/handler";
import { setData } from "../../helpers/localStorage";
import { keys } from "../../constants/config";


export const authService = {
    store: async (
        payload: any,
        dispatch: Dispatch,
      ) => {
        const response: any = await postRequest(endpoints.authLogin, payload);
        await httpServiceHandler(dispatch, response);
    
        if (response.status === 200) {
            setData(keys.API_TOKEN, response.data.accessToken)
          console.log(response);
          
        }
        return response;
      },
}