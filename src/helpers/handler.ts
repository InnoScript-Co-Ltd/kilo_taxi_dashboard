import { HTTPErrorResponse, HTTPResponse, keys } from "../constants/config";
import { checkRefreshToken, updateError } from "../shares/shareSlice";
import { removeData } from "./localStorage";
import { Dispatch } from "redux";

/**
 * Payload handler for update state
 * @param {*} payload
 * @param {*} value
 * @param {*} field
 * @param {*} fn
 */
export const payloadHandler = (
  payload: any,
  value: string | number,
  field: string,
  fn: (updatedPayload: any) => void
) => {
  let updatePayload = { ...payload };
  updatePayload[field] = value;
  fn(updatePayload);
};

/**
 * Http error handler for api call
 * @param {*} error
 * @returns
 */
export const httpErrorHandler1 = (error: any) => {
  if (error.code === "ERR_NETWORK") {
    const response = {
      message: error.message,
      status: 0,
      notification: {
        show: true,
        msg: "Network Error!",
        variant: "error",
      },
    };

    return response;
  }

  const { status, data } = error.response;

  if (
    status === 400 ||
    status === 404 ||
    status === 500 ||
    status === 403 ||
    status === 405
  ) {
    return {
      status: status,
      message: error.message,
      notification: {
        show: true,
        variant: "warning",
        msg: error.message,
      },
    };
  }

  if (status === 422) {
    return { status: status, error: data.data };
  }

  if (status === 401) {
    removeData(keys.API_TOKEN);
    window.location.reload();
    return {
      status: status,
      error: data.message,
    };
  }
};
/**
 * Http error handler for api call
 * @param {*} error
 * @returns
 */
export const httpErrorHandler = async (
  error: any,
  dispatch: Dispatch
): Promise<HTTPErrorResponse> => {
  if (error.code === "ERR_NETWORK") {
    return {
      message: "Network Error!", // Ensure message is set
      status: 0,
      notification: {
        show: true,
        msg: "Network Error!",
        variant: "error",
      },
    };
  }

  const { status, data } = error.response;

  if ([400, 404, 500, 403, 405].includes(status)) {
    return {
      status: status,
      message: error.message || "An error occurred", // Ensure message is set
      notification: {
        show: true,
        variant: "warning",
        msg: error.message,
      },
    };
  }

  if (status === 422) {
    return {
      status: status,
      message: "Validation error", // Add message for 422 status
      error: data.data,
    };
  }

  if (status === 401) {
    // removeData(keys.API_TOKEN);
    // window.location.reload();
    console.log("Unauthorized access");
    dispatch(checkRefreshToken(true));
    // authService.refreshToken();
    // return {
    //   status: status,
    //   message: "Unauthorized access",  // Add message for 401 status
    //   error: data.message,
    // };
  }

  return {
    status: status,
    message: "Unknown error", // Fallback for unknown cases
    notification: {
      show: true,
      msg: "An unexpected error occurred.",
      variant: "error",
    },
  };
};

/**
 * Http response handler for api call
 * @param {*} result
 * @returns
 */
export const httpResponseHandler = (result: any) => {
  const response: HTTPResponse = {
    status: result.status,
    statusText: result.statusText,
    data: result.data,
  };

  return response;
};

/**
 * Http status handler from service
 * @param {*} dispatch
 * @param {*} result
 * @returns
 */
export const httpServiceHandler = async (
  dispatch: Dispatch,
  result: { status: number; notification?: string | any; error?: string },
  noti?: any
) => {
  // console.log("result:", result);
  await dispatch(updateError(null));
  if (
    result.status === 400 ||
    result.status === 0 ||
    result.status === 500 ||
    result.status === 404 ||
    result.status === 403 ||
    result.status === 405
  ) {
    noti?.show(result.notification?.msg, {
      severity: "error",
      autoHideDuration: 3000,
    });
  }

  if (result.status === 422) {
    await dispatch(updateError(result.error));
  }

  if (result.status === 204) {
    return null;
  }

  return;
};
