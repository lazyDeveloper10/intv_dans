import { Router } from 'express';

import { RouteInterface } from '../../../model';

import { userRouter } from './user.route';

export const systemAdminIndexRouter: Router = Router();

const routerRoutes: RouteInterface[] = [
    {
        path: '/user',
        route: userRouter
    },
];

routerRoutes.forEach((route: RouteInterface) => {
    systemAdminIndexRouter.use(route.path!, route.route);
});
