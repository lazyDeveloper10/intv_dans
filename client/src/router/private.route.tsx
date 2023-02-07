import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { vars } from '../config';

export const PrivateRouter = () => {
    const location = useLocation();

    return localStorage.getItem(vars.JWT_TOKEN)
        ? <Outlet/>
        : <Navigate to="/user/sign-in" state={{ from: location }} replace/>;
};
