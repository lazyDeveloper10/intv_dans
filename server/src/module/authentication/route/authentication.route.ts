import { Router } from 'express';

import { authenticationController } from '../controller';

import { authentication, basicAuthentication } from '../../../middleware';

export const authenticationRouter: Router = Router();

authenticationRouter
    .route('/sign-in')
    .post(basicAuthentication, authenticationController.generateJwtToken);

authenticationRouter
    .route('/sign-out')
    .post(authentication, authenticationController.signOut)
