import { RequestHandler, Request,  Response, NextFunction } from 'express';

interface PaginateInterface {
    page: number;
    limit: number;
    sortBase?: any;
    sortDirection?: any;
}

let paginate: PaginateInterface = {
    page: 0,
    limit: 0,
    sortBase: '',
    sortDirection: ''
};

export const pagination: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    paginate.page = Number(req.query.page) || 1;
    paginate.limit = Number(req.query.limit) || 10;

    if (req.query.sortBased || req.query.sortDirection) {
        if (req.query.sortBased) paginate.sortBase = req.query.sortBased;
        else paginate.sortBase = 'createdAt';

        if (req.query.sortDirection) paginate.sortDirection = typeof req.query.sortDirection === 'string' ? req.query.sortDirection.toLowerCase() : req.query.sortDirection;
        else paginate.sortDirection = 'asc';
    } else {
        paginate.sortBase = 'createdAt';
        paginate.sortDirection = 'asc';
    }

    req.paginated = {
        page: paginate.page,
        limit: paginate.limit,
        sort: {
            [paginate.sortBase]: paginate.sortDirection
        },
        searchTerm: req.query.searchTerm ? req.query.searchTerm : '',
        description: req.query.description ? req.query.description : '',
        location: req.query.location ? req.query.location : '',
    };

    next();
};
