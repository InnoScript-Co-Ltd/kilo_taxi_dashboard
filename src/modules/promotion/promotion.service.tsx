import { Dispatch } from 'redux';
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { PromotionFormInputs } from "./promotion.payload";
import { index, show, update } from "./promotion.slice"

export const promotionService = {
    // Method to create a new state
    store: async (payload: PromotionFormInputs, dispatch: Dispatch, notifications? : any) => {
        const response: any = await postRequest(endpoints.promotion, payload);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            notifications.show('Promotion is created successfully', {
                severity : "success",
                autoHideDuration: 3000,
              });
        }
        return response;
    },

    index: async (dispatch: Dispatch, params: any, notifications? : any) => {
        const response: any = await getRequest(endpoints.promotion, params);
        await httpServiceHandler(dispatch, response);
        if(response.status === 200) { 
            //'info' | 'success' | 'warning' | 'error'
            notifications.show('Promotion list is successfully retrieved!', {
                severity : "info",
                autoHideDuration: 3000,
              });
            dispatch(index(response.data ? response.data : response.data));
        }
        return response;
    },

    // Method to update an existing state by ID
    update: async (dispatch: Dispatch, id: number, payload: PromotionFormInputs, notifications? : any) => {
        const response: any = await putRequest(`${endpoints.promotion}/${id}`, payload);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            notifications?.show('Promotion is updated successfully', {
                severity : "success",
                autoHideDuration: 3000,
              });
            dispatch(update(response.data));
        }
        return response;
    },

    // Method to fetch details of a specific state by ID
    show: async (dispatch: Dispatch, id: number) => {
        const response: any = await getRequest(`${endpoints.promotion}/${id}`, null);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(show(response.data));
        }

        return response;
    }
};
