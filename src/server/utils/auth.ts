import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
//solve secret to come from .env file without conflict
const SECRET = "kJsdDsd0kf65SDFdhrhERGf4";

export const hashPassword = async (password: string):Promise<void | string> => bcrypt.hashSync(password, saltRounds);

export const createToken = (payload: {id: number, username: string}):string => jwt.sign(payload, SECRET);

export const verifyPassword = async (plainPassword: string, hashedPassword: string):Promise<unknown> => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } 
    catch(error){
        return error;
    }
};