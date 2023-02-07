import { Request, Response } from 'express';

import {
    userCreateCore,
    userDeleteCore,
    userFindAllCore,
    userFindByIdCore,
    userFindDropdownCore,
    userInactiveCore,
    userUpdateCore
} from '../../../core';

import { createUserSchema, updateUserSchema, UserControllerInterface, UserInterface } from '../../../model';

import { errHandlers, hashPassword, responseHelpers } from '../../../helper';

import { responseStatus } from '../../../utils';

export const userController: UserControllerInterface = {
    findAll: async (req: Request, res: Response) => {
        try {
            const [ userData, total ]: any = await userFindAllCore(req.paginated);

            return responseHelpers.responsePagination(res, responseStatus.OK, userData, total, req.paginated.page, req.paginated.limit, req.paginated.sort);

        } catch (err) {
            const [ message, status, error ] = await errHandlers(err);

            return responseHelpers.response(res, status, error, 'User', message);
        }
    },

    findById: async (req: Request, res: Response) => {
        try {
            const userData: any = await userFindByIdCore(req.params.id);

            return responseHelpers.response(res, responseStatus.OK, userData);

        } catch (err) {
            const [ message, status, error ] = await errHandlers(err);

            return responseHelpers.response(res, status, error, 'User', message);
        }
    },

    findDropdown: async (req: Request, res: Response) => {
        try {
            const userData: any = await userFindDropdownCore(req.params.searchTerm);

            return responseHelpers.response(res, responseStatus.OK, userData);

        } catch (err: any) {
            const [ message, status, error ] = await errHandlers(err);

            return responseHelpers.response(res, status, error, 'User', message);
        }
    },

    createOne: async (req: Request, res: Response) => {
        try {
            const validated: UserInterface = await createUserSchema.validateAsync(req.body)

            validated.password = await hashPassword(validated.password!);
            validated.createdByUserId = req.user.id;
            validated.updatedByUserId = req.user.id;

            const userData: any = await userCreateCore(validated);

            return responseHelpers.response(res, responseStatus.CREATED, userData, 'User', 'User Created');

        } catch (err: any) {
            const [ message, status, error ] = await errHandlers(err);

            return responseHelpers.response(res, status, error, 'User', message);
        }
    },

    updateOne: async (req: Request, res: Response) => {
        try {
            const validated: UserInterface = await updateUserSchema.validateAsync(req.body)

            if (validated.password) {
                validated.password = await hashPassword(validated.password!);
            }

            validated.updatedByUserId = req.user.id;

            const userData: any = await userUpdateCore(req.params.id, validated);

            return responseHelpers.response(res, responseStatus.OK, userData, 'User', 'User Updated');

        } catch (err: any) {
            const [ message, status, error ] = await errHandlers(err);

            return responseHelpers.response(res, status, error, 'User', message);
        }
    },

    inactiveOne: async (req: Request, res: Response) => {
        try {
            const userData: any = await userInactiveCore(req.params.id);

            return responseHelpers.response(res, responseStatus.OK, userData, 'User', 'User Inactivated');

        } catch (err: any) {
            const [ message, status, error ] = await errHandlers(err);

            return responseHelpers.response(res, status, error, 'User', message);
        }
    },

    deleteOne: async (req: Request, res: Response) => {
        try {
            const userData: any = await userDeleteCore(req.params.id);

            return responseHelpers.response(res, responseStatus.OK, userData, 'User', 'User Deleted');

        } catch (err: any) {
            const [ message, status, error ] = await errHandlers(err);

            return responseHelpers.response(res, status, error, 'User', message);
        }
    },
}
