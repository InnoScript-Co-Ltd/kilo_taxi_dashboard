import { Dispatch } from 'redux';
import { endpoints } from "../../constants/endpoints"
import { getRequest, postRequest, putRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { CountryFormInputs } from "./country.payload";
import { index, show, update } from "./country.slice";

export const countryService = {
    store: async (payload: any, dispatch: Dispatch, notifications:any) => {
        const response : any = await postRequest(endpoints.country, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 201) {
            //'info' | 'success' | 'warning' | 'error'
            notifications.show('Country is created successfully', {
                severity : "success",
                autoHideDuration: 3000,
              });
        }
        return response;
    },

    index: async (dispatch: Dispatch, params: any, notifications: any) => {
        const response: any = await getRequest(endpoints.country, params);
        await httpServiceHandler(dispatch, response, notifications);
        if(response.status === 200) { 
            //'info' | 'success' | 'warning' | 'error'
            notifications.show('Country list is successfully retrieved!', {
                severity : "info",
                autoHideDuration: 3000,
              });
            dispatch(index(response.data ? response.data : response.data));
        }
        return response;
    },

    update: async (dispatch: Dispatch, id: number, payload: CountryFormInputs, notifications? : any) => {
        const response: any = await putRequest(`${endpoints.country}/${id}`, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            //'info' | 'success' | 'warning' | 'error'
            notifications?.show('Country is updated successfully', {
                severity : "success",
                autoHideDuration: 3000,
              });
            dispatch(update(response.data));
        }
        return response;
    },

    show: async (dispatch: Dispatch, id : number) => {
        const response: any = await getRequest(`${endpoints.country}/${id}`, null);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(show(response.data));
        }
        
        return response;
    }
}