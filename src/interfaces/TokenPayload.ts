import * as jwt from 'jsonwebtoken';

export default interface TokenPayload extends jwt.JwtPayload {
    email: string;
}