import { Dispatch } from 'redux';
import { endpoints } from "../../constants/endpoints"
import { getRequest, postRequest, putRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { CustomerFormInputs } from "./customer.payload";
import { index, show, update } from "./customer.slice";

export const customerService = {
    store: async (payload: any, dispatch: Dispatch, notifications:any) => {
        const response : any = await postRequest(endpoints.customer, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 201) {
            //'info' | 'success' | 'warning' | 'error'
            notifications.show('Customer is created successfully', {
                severity : "success",
                autoHideDuration: 3000,
              });
        }
        return response;
    },

    index: async (dispatch: Dispatch, params: any, notifications: any) => {
        const response: any = await getRequest(endpoints.customer, params);
        await httpServiceHandler(dispatch, response, notifications);
        if(response.status === 200) { 
            //'info' | 'success' | 'warning' | 'error'
            notifications.show('Customer list is successfully retrieved!', {
                severity : "info",
                autoHideDuration: 3000,
              });
            dispatch(index(response.data ? response.data : response.data));
        }
        return response;
    },

    update: async (dispatch: Dispatch, id: number, payload: CustomerFormInputs, notifications? : any) => {
        const response: any = await putRequest(`${endpoints.customer}/${id}`, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            //'info' | 'success' | 'warning' | 'error'
            notifications?.show('Customer is updated successfully', {
                severity : "success",
                autoHideDuration: 3000,
              });
            dispatch(update(response.data));
        }
        return response;
    },

    show: async (dispatch: Dispatch, id : number) => {
        const response: any = await getRequest(`${endpoints.customer}/${id}`, null);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(show(response.data));
        }
        
        return response;
    }
}