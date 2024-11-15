import { Dispatch } from 'redux';
import { endpoints } from "../../constants/endpoints"
import { getRequest, postRequest, putRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { AdminFormInputs } from "./admin.payload";
import { index, show, update } from "./admin.slice";

export const adminService = {
    store: async (payload: any, dispatch: Dispatch, notifications:any) => {
        const response : any = await postRequest(endpoints.admin, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 201) {
            //'info' | 'success' | 'warning' | 'error'
            notifications.show('Admin is created successfully', {
                severity : "success",
                autoHideDuration: 3000,
              });
        }
        return response;
    },

    index: async (dispatch: Dispatch, params: any, notifications: any) => {
        const response: any = await getRequest(endpoints.admin, params);
        await httpServiceHandler(dispatch, response, notifications);
        if(response.status === 200) { 
            //'info' | 'success' | 'warning' | 'error'
            notifications.show('Admin list is successfully retrieved!', {
                severity : "info",
                autoHideDuration: 3000,
              });
            dispatch(index(response.data ? response.data : response.data));
        }
        return response;
    },

    update: async (dispatch: Dispatch, id: number, payload: AdminFormInputs, notifications? : any) => {
        const response: any = await putRequest(`${endpoints.admin}/${id}`, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            //'info' | 'success' | 'warning' | 'error'
            notifications?.show('Admin is updated successfully', {
                severity : "success",
                autoHideDuration: 3000,
              });
            dispatch(update(response.data));
        }
        return response;
    },

    show: async (dispatch: Dispatch, id : number) => {
        const response: any = await getRequest(`${endpoints.admin}/${id}`, null);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(show(response.data));
        }
        
        return response;
    }
}