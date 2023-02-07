import axios from 'axios';


// import { refreshService, signOutService } from '../modules/authentication/services';

const headers = {
    'Content-Type': 'application/json',
};

export const http = axios.create({
    baseURL: 'http://dev3.dansmultipro.co.id/api/recruitment',
    headers,
});
