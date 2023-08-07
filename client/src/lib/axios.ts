import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios";

export interface Response {
    body: any,
    status: number
}

export const getRequest = (requestUrl: string, token: string): Promise<Response> => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return new Promise(async (resolve, reject) => {
        try {
            const response: AxiosResponse = await axios.get(requestUrl, config);
            const clientResponse: Response = {
                body: response.data,
                status: response.status
            };
            resolve(clientResponse);
        } catch (err: any) {
            reject();
        }
    });
}

export const postRequest = (requestUrl: string, body: Object, token: string): Promise<Response> => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return new Promise(async (resolve, reject) => {
        try {
            const { data: responseBody, status: responseStatus }: AxiosResponse = await axios.post(requestUrl, body, config);
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
        headers: {
            Authorization: `Bearer ${token}`
        },
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
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return new Promise(async (resolve, reject) => {
        try {
            const { data: responseBody, status: responseStatus } = await axios.patch(requestUrl, body, config);
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