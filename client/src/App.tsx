import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthenticationProvider } from './context';

import { AppDefaultLayout } from './components/layout';

import { AuthenticationRouter } from './modules/authentication/routes/authentication.route';
import { JobListingRouter } from './modules/job-listing/routes/job-listing.route';

const App = () => {
    return (
        <BrowserRouter>
            <AuthenticationProvider>
                <Routes>
                    <Route element={<AppDefaultLayout/>}>
                        <Route path="/job/*" element={<JobListingRouter/>}/>
                    </Route>

                    <Route path="/user/*" element={<AuthenticationRouter/>}/>
                </Routes>
            </AuthenticationProvider>
        </BrowserRouter>
    )
}

export default App
