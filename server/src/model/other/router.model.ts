import { Router } from 'express';

export interface RouteInterface {
    path: string,
    route: Router
}
