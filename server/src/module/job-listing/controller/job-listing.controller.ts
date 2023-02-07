import { Request, Response } from 'express';

import { jobListingFindAllCore, jobListingFindByIdCore } from '../../../core';

import { JobListingControllerInterface } from '../../../model';

import { errHandlers, responseHelpers } from '../../../helper';

import { responseStatus } from '../../../utils';

export const jobListingController: JobListingControllerInterface = {
    findAll: async (req: Request, res: Response) => {
        try {
            const userData = await jobListingFindAllCore(req.paginated);

            return responseHelpers.responsePagination(res, responseStatus.OK, userData, req.paginated.page, req.paginated.limit);

        } catch (err) {
            const [ message, status, error ] = await errHandlers(err);

            return responseHelpers.response(res, status, error, 'Job Listing', message);
        }
    },

    findById: async (req: Request, res: Response) => {
        try {
            const userData: any = await jobListingFindByIdCore(req.params.id);

            return responseHelpers.response(res, responseStatus.OK, userData);

        } catch (err) {
            const [ message, status, error ] = await errHandlers(err);
            console.log(err);
            return responseHelpers.response(res, status, error, 'Job Listing', message);
        }
    },
}
