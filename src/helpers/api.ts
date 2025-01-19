import { Dispatch } from "redux";
import http from "../constants/axios";
import { HTTPErrorResponse, HTTPResponse } from "../constants/config";
import { httpErrorHandler, httpResponseHandler } from "./handler";

const urlParams = (params: { [key: string]: any }) => {
  let paramsArray: Array<string> = [];
  Object.keys(params).forEach((key) => {
    if (params[key] !== "" && params[key] !== null) {
      paramsArray.push(`${key}=${params[key]}`);
    }
  });
  return paramsArray.join("&");
};

/**
 * Http get method request
 * @param {*} path
 * @param {*} params
 * @returns
 */
export const getRequest = async (
  path: string,
  params: any | null,
  dispatch: Dispatch
): Promise<HTTPResponse | HTTPErrorResponse | undefined> => {
  try {
    const url = params ? `${path}?${urlParams(params)}` : path;
    const result = await http.get(url);
    return httpResponseHandler(result);
  } catch (error) {
    return httpErrorHandler(error, dispatch);
  }
};

/**
 * Http post method request
 * @param {*} path
 * @param {*} payload
 * @returns
 */
export const postRequest = async (
  path: string,
  payload: any,
  dispatch: Dispatch
) => {
  try {
    const result = await http.post(path, payload);
    return httpResponseHandler(result);
  } catch (error) {
    return httpErrorHandler(error, dispatch);
  }
};

/**
 * Http put method request
 * @param {*} path
 * @param {*} payload
 * @returns
 */
export const putRequest = async (
  path: string,
  payload: any,
  dispatch: Dispatch
) => {
  try {
    const result = await http.put(path, payload);
    return httpResponseHandler(result);
  } catch (error) {
    return httpErrorHandler(error, dispatch);
  }
};

/**
 * Http delete method request
 * @param {*} path
 * @returns
 */
export const delRequest = async (path: string, dispatch: Dispatch) => {
  try {
    const result = await http.delete(path);
    return httpResponseHandler(result);
  } catch (error) {
    return httpErrorHandler(error, dispatch);
  }
};
