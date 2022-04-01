import { prisma } from '../utils/prisma';
import { Request, Response } from 'express';
import { PRISMA_ERROR, SERVER_ERROR, SERVER_SUCCESS } from '../config/serverRes';
import { createToken, hashPassword, verifyPassword } from '../utils/auth';
import { Prisma } from '@prisma/client';

export const createUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>> | undefined> =>  {
    const { username, email } = req.body;
    let { password } = req.body;

    password = await hashPassword(password);

    try {
        const createdUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password
            }
        });
    
        if(!createdUser){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE })
        }
    
        const userToReturn = {
            id: createdUser.id,
            username: createdUser.username
        };
    
        const createdToken = createToken({id: createdUser.id, username: createdUser.username});
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: userToReturn, token: createdToken });
    }
    catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === PRISMA_ERROR.UNIQUE_CONSTRAINT_VIOLATION.CODE) {
                res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: PRISMA_ERROR.UNIQUE_CONSTRAINT_VIOLATION.CLIENT_MESSAGE_REGISTER });
            }
        }
    }
}

export const authenticateUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const foundUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    if (!foundUser) {
        return res.status(SERVER_ERROR.UNAUTHORIZED.CODE).json({ error: SERVER_ERROR.UNAUTHORIZED.MESSAGE });
    }

    const passwordMatch = await verifyPassword(password, foundUser.password);

    if(!passwordMatch){
        return res.status(SERVER_ERROR.UNAUTHORIZED.CODE).json({ error: SERVER_ERROR.UNAUTHORIZED.MESSAGE });
    }

    const createdToken = createToken({id: foundUser.id, username: foundUser.username});

    const userToReturn = {
        id: foundUser.id,
        username: foundUser.username
    };

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: userToReturn, token: createdToken });
}