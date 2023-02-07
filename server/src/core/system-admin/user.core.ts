import { UserInterface } from '../../model';

import { prisma } from "../../config";

export const userFindAllCore = async (paginate: any) => {
    const [ userData, total ]: [ UserInterface[], number ] | any = await prisma.$transaction([
        prisma.user.findMany(
            {
                where: {
                    OR: [
                        {
                            fullName: {
                                contains: paginate.searchTerm,
                                mode: 'insensitive'
                            },
                        },
                        {
                            username: {
                                contains: paginate.searchTerm,
                                mode: 'insensitive'
                            },
                        },
                        {
                            email: {
                                contains: paginate.searchTerm,
                                mode: 'insensitive'
                            }
                        }
                    ]
                },

                skip: ((paginate.page - 1) * paginate.limit),
                take: paginate.limit,

                orderBy: [
                    paginate.sort
                ],
            }
        ),

        prisma.user.count(
            {
                where: {
                    OR: [
                        {
                            fullName: {
                                contains: paginate.searchTerm,
                                mode: 'insensitive'
                            },
                        },
                        {
                            username: {
                                contains: paginate.searchTerm,
                                mode: 'insensitive'
                            },
                        },
                        {
                            email: {
                                contains: paginate.searchTerm,
                                mode: 'insensitive'
                            }
                        }
                    ]
                },
            }
        ),
    ]);

    userData.map((item: UserInterface) => {
        delete item.password;
    })

    return [ userData, total ];
};

export const userFindByIdCore = async (id: string) => {
    const userData: UserInterface | any = await prisma.user.findFirst(
        {
            where: {
                id: id
            },
        }
    );

    delete userData.password;

    return userData;
};

export const userFindDropdownCore = async (searchTerm: string) => {
    const userData: UserInterface[] | any[] = await prisma.user.findMany(
        {
            where: {
                email: {
                    contains: searchTerm,
                    mode: 'insensitive'
                },
                activeFlag: true,
            },
        }
    );

    userData.map((item) => {
        delete item.password;
    })

    return userData;
};

export const userCreateCore = async (body: any) => {
    const userData: UserInterface | any = await prisma.user.create(
        {
            data: body,
        }
    );

    delete userData.password;

    return userData;
};

export const userUpdateCore = async (id: string, body: any) => {
    const userData: UserInterface | any = await prisma.user.update(
        {
            where: {
                id: id
            },

            data: body,
        }
    );

    delete userData.password;

    return userData;
};

export const userInactiveCore = async (id: string) => {
    const userData: UserInterface | any = await prisma.user.update(
        {
            where: {
                id: id
            },

            data: {
                activeFlag: false
            },
        }
    );

    delete userData.password;

    return userData;
};

export const userDeleteCore = async (id: string) => {
    const userData: UserInterface | any = await prisma.user.delete(
        {
            where: {
                id: id
            },
        }
    );

    delete userData.password;

    return userData;
};
