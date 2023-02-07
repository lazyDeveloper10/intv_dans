import { Response } from 'express';

export const responseHelpers: any = {
    responsePagination: (res: Response, status: number, value: Object, page: number, limit: number) => {
        return res.status(status).json({
            ...(value) && { value: value },
            ...(page) && { page: page },
            ...(limit) && { limit: limit },
        });
    },

    response: (res: Response, status: number, value: Object | string, title?: string, message?: string,) => {
        return res.status(status).json({
            ...(title) && { title: title },
            ...(message) && { message: message },
            ...(value) && { value: value }
        });
    },
};
