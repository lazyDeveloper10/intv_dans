import { NextFunction, Request, RequestHandler, Response } from 'express';

import { basicAuthenticationCore } from '../core';

import { responseHelpers } from '../helper';

import { responseStatus } from '../utils';

export const basicAuthentication: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new Error('Error: Wrong username and password');
        }

        req.user = await basicAuthenticationCore(username, password);

        next();

    } catch (err: any) {
        if (err.message === 'Error: Wrong username and password') {
            return responseHelpers.response(res, responseStatus.BAD_REQUEST, err.message, 'Error', err.message);
        }

        return responseHelpers.response(res, responseStatus.INTERNAL_SERVER_ERROR, 'Internal server error', 'Error', 'Internal server error');
    }
}
