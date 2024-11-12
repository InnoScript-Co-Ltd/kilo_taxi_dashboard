import { Dispatch } from 'redux';
import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { STATE_PAYLOAD, StateFormInputs } from "./state.payload";
import { index, show, update } from "./state.slice"

// // Creating an interface that only includes the `create` part of `STATE_PAYLOAD`
// export interface STATE_STORE extends Pick<STATE_PAYLOAD, 'create'> {}
// export interface STATE_UPDATE extends Pick<STATE_PAYLOAD, 'update'> {}

export const stateService = {
    // Method to create a new state
    store: async (payload: StateFormInputs, dispatch: Dispatch) => {
        const response: any = await postRequest(endpoints.state, payload);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(updateNotification({
                msg: "State is created successfully",
                variant: "success",
                show: true
            }));
        }
        return response;
    },

    index: async (dispatch: Dispatch, params: any) => {
        const response: any = await getRequest(endpoints.state, params);
        console.log(response);
        
        await httpServiceHandler(dispatch, response);
        if(response.status === 200) { 
            dispatch(updateNotification({
                msg: "State list is successfully retrieved!",
                variant: "info",
                show: true
            }));
            dispatch(index(response.data ? response.data : response.data));
        }
        return response;
    },

    // Method to update an existing state by ID
    update: async (dispatch: Dispatch, id: number, payload: StateFormInputs) => {
        const response: any = await putRequest(`${endpoints.state}/${id}`, payload);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(update(response.data));
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: response.message,
            }));
        }
        return response;
    },

    // Method to fetch details of a specific state by ID
    show: async (dispatch: Dispatch, id: number) => {
        const response: any = await getRequest(`${endpoints.state}/${id}`, null);
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(show(response.data));
        }

        return response;
    }
};
