import axios from "axios";

import { vars } from '../config';

import { AppToastrComponent } from '../components/toastr';

// import { refreshService, signOutService } from '../modules/authentication/services';

const headers = {
    'Content-Type': 'application/json',
};

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_KEY_DEV_STAT === 'DEVELOPMENT' ? import.meta.env.VITE_API_KEY_API_DEVELOPMENT_HOST : import.meta.env.VITE_API_KEY_API_PRODUCTION_HOST,
    headers,
});

http.interceptors.request.use((config) => {
    if (!config.headers) {
        // @ts-ignore
        config.headers = {};
    }

    if (!config.headers['Authorization'] && localStorage.getItem(vars.JWT_TOKEN)) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem(vars.JWT_TOKEN)}`;
    }

    return config;

}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use(async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // console.log(response, 'ini response interceptor di env');

    if (response.data?.message) {
        AppToastrComponent(response.data.message);
    }

    return response;

}, async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // console.log(error, 'ini error interceptor di env');

    const prevRequest = error?.config;

    // if (error?.response?.status === 401 && !prevRequest?.sent) {
    //     prevRequest.sent = true;
    //
    //     const { data } = await refreshService({
    //         refresh_token: `${localStorage.getItem(vars.REFRESH_TOKEN)}`
    //     });
    //
    //     localStorage.setItem(vars.ACCESS_TOKEN, data.value.access_token);
    //
    //     prevRequest.headers['Authorization'] = `Bearer ${data.value.access_token}`;
    //
    //     return axios(prevRequest);
    // }

    if (error?.response.status === 403) {
        // const { data } = await signOutService();
        // localStorage.clear();
    }

    return Promise.reject(error);
});
