export * from './job-listing.controller';
import { Router } from 'express';

import { RouteInterface } from '../../../model';

import { jobListingRouter } from '../router/job-listing.route';

export const jobListingIndexRouter: Router = Router();

const routerRoutes: RouteInterface[] = [
    {
        path: '/',
        route: jobListingRouter
    },
];

routerRoutes.forEach((route: RouteInterface) => {
    jobListingIndexRouter.use(route.path!, route.route);
});
