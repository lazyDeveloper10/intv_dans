export const errHandlers = async (err: any) => {
    if (err.hasOwnProperty('details')) {
        return [ 'Validation Error', 400, err.details ];
    }

    if (err?.code) {
        switch (err?.code) {
            case 'P2002': {
                return [ 'Prisma Validation Error', 400, 'Unique constraint violated' ];
            }
        }
    }

    if (err.message.split(' ')[0] === 'Error:' ) {
        return [ 'Error', 400, err.message ];
    }

    return [ 'Server Error', 500, 'Internal Server Error' ];
};
