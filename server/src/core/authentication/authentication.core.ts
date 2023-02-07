import { sign, verify } from 'jsonwebtoken'

import { UserInterface } from '../../model';

import { prisma } from '../../config';

import { comparePassword } from '../../helper';

export const basicAuthenticationCore = async (username: string, password: string) => {
    const userData: UserInterface | any = await prisma.user.findFirst(
        {
            where: {
                OR: [
                    {
                        username: username
                    },
                    {
                        email: username
                    }
                ]
            },
        }
    );

    if (!userData) {
        throw new Error('Error: Wrong username and password');
    }

    if (!userData.activeFlag) {
        throw new Error('Error: Wrong username and password');
    }

    const resultVerifyPassword = await comparePassword(password, userData.password!);

    if (!resultVerifyPassword) {
        throw new Error('Error: Wrong username and password');
    }

    delete userData.password;

    return userData;
};

export const generateJwtTokenCore = async (userData: UserInterface) => {
    const payload = {
        id: userData.id,
        username: userData.username,
        email: userData.email
    };

    const secret: any = process.env.JWT_SECRET;

    const token = sign(payload, secret)

    const jwtTokenData = await prisma.jwtToken.create(
        {
            data: {
                token: token,
                userId: userData.id
            },
        }
    );

    return jwtTokenData;
}

export const signOutCore = async (userData: UserInterface) => {
    const jwtToken = await prisma.jwtToken.findFirst(
        {
            where: {
                userId: userData.id
            }
        }
    );

    if (!jwtToken) {
        throw new Error('Error: Authentication failed');
    }

    const jwtTokenData = await prisma.jwtToken.delete(
        {
            where: {
                id: jwtToken.id
            }
        }
    );

    return jwtTokenData;
}

export const jwtAuthenticationCore = async (jwtToken: string) => {
    const jwtTokenIsExist = await prisma.jwtToken.findFirst(
        {
            where: {
                token: jwtToken
            }
        }
    );

    if (!jwtTokenIsExist) {
        throw new Error('Error: Forbidden access');
    }

    const secret: any = process.env.JWT_SECRET;

    try {
        return verify(jwtToken, secret);

    } catch (err) {
        throw new Error('Error: Forbidden access');
    }
}
