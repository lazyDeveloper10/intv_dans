import { Router } from 'express';

import { jobListingController } from '../controller';

import { authentication, pagination } from '../../../middleware';

export const jobListingRouter: Router = Router();

jobListingRouter
    .route('/')
    .get(authentication, pagination, jobListingController.findAll)

jobListingRouter
    .route('/:id')
    .get(authentication, jobListingController.findById)

