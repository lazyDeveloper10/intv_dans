import { NextFunction, Request, RequestHandler, Response } from 'express';

import { jwtAuthenticationCore } from '../core';

import { responseHelpers } from '../helper';

import { responseStatus } from '../utils';

export const authentication: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers["authorization"]) {
            throw new Error('Error: Forbidden access');
        }

        const [ _, jwtToken ] = req.headers["authorization"].split(' ');

        if (!jwtToken) {
            throw new Error('Error: Forbidden access');
        }

        req.user = await jwtAuthenticationCore(jwtToken);

        next();

    } catch (err: any) {
        if (err.message === 'Error: Token Expired') {
            return responseHelpers.response(res, responseStatus.UNAUTHORIZED, err.message, err.message, 'Unauthorized');
        }

        if (err.message === 'Error: Forbidden access') {
            return responseHelpers.response(res, responseStatus.FORBIDDEN, err.message, 'Forbidden', err.message);
        }

        return responseHelpers.response(res, responseStatus.INTERNAL_SERVER_ERROR, 'Internal server error', 'Error', 'Internal server error');
    }
};
