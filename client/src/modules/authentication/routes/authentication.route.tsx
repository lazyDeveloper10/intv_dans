import { Route, Routes } from 'react-router-dom';

import loadable from '@loadable/component';

const AppSignInPage = loadable(() => import('../pages/sign-in'));

export const AuthenticationRouter = () => {
    return (
        <Routes>
            <Route path="/sign-in" element={<AppSignInPage/>}/>
        </Routes>
    )
};
