import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.withCredentials = true; // Sends cookies with each request

export interface Response {
    body: any,
    status: number
}

/**
 * Makes an HTTP GET request and returns a promise that resolves with the response body and status code, 
 * or rejects with an error.
 * 
 * @param {string} requestUrl - The URL of the resource you want to retrieve.
 * @returns A Promise that resolves to a Response object.
 */
export const getRequest = (requestUrl: string): Promise<Response> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data: responseBody, status: responseStatus }  = await axios.get(requestUrl);
            const clientResponse: Response = {
                body: responseBody,
                status: responseStatus
            };
            resolve(clientResponse);
        } catch (err: any) {
            reject(err);
        }
    });
}

/**
 * Makes an HTTP POST request and returns a promise that resolves with the response body and status code, 
 * or rejects with an error.
 * 
 * @param {string} requestUrl - The URL of the resource you want to retrieve.
 * @returns A Promise that resolves to a Response object.
 */
export const postRequest = (requestUrl: string, body: Object): Promise<Response> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data: responseBody, status: responseStatus }: AxiosResponse = await axios.post(requestUrl, body);
            const clientResponse: Response = {
                body: responseBody,
                status: responseStatus
            }
            resolve(clientResponse);
        } catch (err: any) {
            reject();
        }
    });
};

/**
 * Makes an HTTP DELETE request and returns a promise that resolves with the response body and status code, 
 * or rejects with an error.
 * 
 * @param {string} requestUrl - The URL of the resource you want to retrieve.
 * @returns A Promise that resolves to a Response object.
 */
export const deleteRequest = (requestUrl: string, body: Object): Promise<Response> => {
    const config: AxiosRequestConfig = {
        data: body
    }
    return new Promise(async (resolve, reject) => {
        try {
            const { data: responseBody, status: responseStatus } = await axios.delete(requestUrl, config);
            const clientResponse: Response = {
                body: responseBody,
                status: responseStatus
            }
            resolve(clientResponse);
        } catch (err: any) {
            reject();
        }
    });
};

/**
 * Makes an HTTP PATCH request and returns a promise that resolves with the response body and status code, 
 * or rejects with an error.
 * 
 * @param {string} requestUrl - The URL of the resource you want to retrieve.
 * @returns A Promise that resolves to a Response object.
 */
export const patchRequest = (requestUrl: string, body: Object): Promise<Response> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data: responseBody, status: responseStatus } = await axios.patch(requestUrl, body);
            const clientResponse: Response = {
                body: responseBody,
                status: responseStatus
            }
            resolve(clientResponse);
        } catch (err: any) {
            reject();
        }
    }); 
};