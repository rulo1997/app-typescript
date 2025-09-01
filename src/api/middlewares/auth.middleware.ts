import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AppError } from '../../core/AppError';
import { TokenPayload } from '../../core/types/express';

export const protect = ( req: Request , res: Response , next: NextFunction ) => {

    let token: string | null = null;
    const authHeader = req.headers.authorization;

    if( authHeader && authHeader.startsWith('Bearer') ) token = authHeader.split(' ')[1];

    if( !token ) return next( new AppError('No estás autenticado. Por favor, inicia sesión.', 401 ) );

    try {

        const decoded = jwt.verify( token , process.env.JWT_SECRET as string ) as TokenPayload;

        req.user = decoded;

        next();

    } catch( error ) {

        return next( new AppError('El token no es válido o ha expirado.', 401 ) );

    }
};