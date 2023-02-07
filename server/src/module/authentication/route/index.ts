import { Router } from 'express';

import { RouteInterface } from '../../../model';

import { authenticationRouter } from "./authentication.route";

export const authenticationIndexRouter: Router = Router();

const routerRoutes: RouteInterface[] = [
    {
        path: '/connect',
        route: authenticationRouter
    },
];

routerRoutes.forEach((route: RouteInterface) => {
    authenticationIndexRouter.use(route.path!, route.route);
});
