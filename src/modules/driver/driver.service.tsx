import { Dispatch } from 'redux';
import { endpoints } from "../../constants/endpoints";
import { getRequest, putRequest} from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index, show, update } from "./driver.slice";
import { DriverFormInputs } from './driver.payload';

export const driverService = {

    // Method to fetch the list of drivers
    index: async (dispatch: Dispatch, params: any, notifications?: any) => {
        const response: any = await getRequest(endpoints.driver, params, dispatch);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) { 
            //'info' | 'success' | 'warning' | 'error'
            notifications.show('Driver list is successfully retrieved!', {
                severity : "info",
                autoHideDuration: 3000,
              });
            dispatch(index(response.data ? response.data : response.data));
        }
        return response;
    },

    // Method to update an existing state by ID
    update: async (dispatch: Dispatch, id: number, payload: any, notifications? : any) => {
        const response: any = await putRequest(`${endpoints.driver}/${id}`, payload, dispatch);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            //'info' | 'success' | 'warning' | 'error'
            notifications?.show('Driver is updated successfully', {
                severity : "success",
                autoHideDuration: 3000,
              });
            dispatch(update(response.data));
        }
        return response;
    },

    // Method to fetch details of a specific driver by ID
    show: async (dispatch: Dispatch, id: number) => {
        const response: any = await getRequest(`${endpoints.driver}/${id}`, null, dispatch);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(show(response.data));
        }
        return response;
    }
};
