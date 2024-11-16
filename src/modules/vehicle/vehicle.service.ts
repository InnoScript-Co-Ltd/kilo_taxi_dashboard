import { Dispatch } from 'redux';
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { VehicleFormInputs } from "./vehicle.payload"; // Ensure this import path is correct
import { index, show, update } from "./vehicle.slice";

export const vehicleService = {

    // Method to retrieve a list of vehicles with optional parameters
    index: async (dispatch: Dispatch, params: any, notifications?: any) => {
        const response: any = await getRequest(endpoints.vehicle, params);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) { 
            //'info' | 'success' | 'warning' | 'error'
            notifications.show('Vehicle list is successfully retrieved!', {
                severity : "info",
                autoHideDuration: 3000,
              });
            dispatch(index(response.data ? response.data : response.data));
        }
        return response;
    },

    // Method to update an existing vehicle by ID
    update: async (dispatch: Dispatch, id: number, payload: VehicleFormInputs, notifications?: any) => {
        const response: any = await putRequest(`${endpoints.vehicle}/${id}`, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            //'info' | 'success' | 'warning' | 'error'
            notifications?.show('Vehicle is updated successfully', {
                severity : "success",
                autoHideDuration: 3000,
              });
            dispatch(update(response.data));
        }
        return response;
    },

    // Method to fetch details of a specific vehicle by ID
    show: async (dispatch: Dispatch, id: number) => {
        const response: any = await getRequest(`${endpoints.vehicle}/${id}`, null);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(show(response.data));
        }
        return response;
    }
};
