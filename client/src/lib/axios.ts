import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.withCredentials = true; // Sends cookies with each request

export interface Response {
    body: any,
    status: number
}

export const getRequest = (requestUrl: string, token: string): Promise<Response> => {
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

export const postRequest = (requestUrl: string, body: Object, token: string): Promise<Response> => {
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

export const deleteRequest = (requestUrl: string, body: Object, token: string): Promise<Response> => {
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

export const patchRequest = (requestUrl: string, body: Object, token: string): Promise<Response> => {
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