import { http } from '../../../environment/environment';

export const signInService = (body: any) => http.post('/hub/connect/sign-in', body);

export const signOutService = () => http.post('/hub/connect/sign-out');
