import { Route, Routes } from 'react-router-dom';

import loadable from '@loadable/component';

const AppJobListPage = loadable(() => import('../pages/job-list'));
const AppJobDetailPage = loadable(() => import('../pages/job-detail'));

export const JobListingRouter = () => {
    return (
        <Routes>
            <Route index element={<AppJobListPage/>}/>
            <Route path=":jobId/*">
                <Route index element={<AppJobDetailPage/>}/>
            </Route>
        </Routes>
    )
};
