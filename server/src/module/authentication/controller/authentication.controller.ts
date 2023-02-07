import { Request, Response } from 'express';

import { generateJwtTokenCore, signOutCore } from '../../../core';

import { AuthenticationControllerInterface } from '../../../model';

import { responseHelpers } from '../../../helper';

import { responseStatus } from "../../../utils";

export const authenticationController: AuthenticationControllerInterface = {
    generateJwtToken: async (req: Request, res: Response) => {
        try {
            const jwtTokenData: any = await generateJwtTokenCore(req.user);

            return responseHelpers.response(res, responseStatus.OK, { token: jwtTokenData.token });

        } catch (err: any) {
            return responseHelpers.response(res, responseStatus.INTERNAL_SERVER_ERROR, 'Internal server error', 'Error', 'Internal server error');
        }
    },

    signOut: async (req: Request, res: Response) => {
        try {
            const jwtTokenData: any = await signOutCore(req.user);

            let message: any = new Object({});

            if (jwtTokenData) {
                message.message = 'Successfully Sign Out';
            }

            return responseHelpers.response(res, responseStatus.OK, message, 'Successfully Sign Out', 'Successfully Sign Out');

        } catch (err: any) {
            return responseHelpers.response(res, responseStatus.INTERNAL_SERVER_ERROR, 'Internal server error', 'Error', 'Internal server error');
        }
    }
}
