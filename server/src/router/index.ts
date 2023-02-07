import { Router } from 'express';

import { RouteInterface } from '../model';

export const router = Router();

import { authenticationIndexRouter } from '../module/authentication/route';
import { jobListingIndexRouter } from '../module/job-listing/controller';
import { systemAdminIndexRouter } from '../module/system-admin/router';

const defaultRoutes: any = [
    {
        path: '/hub',
        route: authenticationIndexRouter
    },
    {
        path: '/job-listing',
        route: jobListingIndexRouter
    },
    {
        path: '/system-admin',
        route: systemAdminIndexRouter
    },
];

defaultRoutes.forEach((route: RouteInterface) => {
    router.use(route.path, route.route);
});
