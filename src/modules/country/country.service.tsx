import { Dispatch } from 'redux';
import { endpoints } from "../../constants/endpoints"
import { getRequest, postRequest, putRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { COUNTRY_PAYLOAD, CountryFormInputs } from "./country.payload";
import { index, show, update } from "./country.slice";

// Creating an interface that only includes the `create` part of `COUNTRY_PAYLOAD`
export interface COUNTRY_STORE extends Pick<COUNTRY_PAYLOAD, 'create'> {}
export interface COUNTRY_UPDATE extends Pick<COUNTRY_PAYLOAD, 'update'> {}

export const countryService = {
    store: async (payload: any, dispatch: Dispatch, notifications:any) => {
        const response : any = await postRequest(endpoints.country, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 201) {
            // dispatch(updateNotification({
            //     msg: "Country is created successfully",
            //     variant: "success",
            //     show: true
            // }));
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
        await httpServiceHandler(dispatch, response);
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

    update: async (dispatch: Dispatch, id: number, payload: CountryFormInputs) => {
        const response: any = await putRequest(`${endpoints.country}/${id}`, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(update(response.data));
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: response.message
            }));
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