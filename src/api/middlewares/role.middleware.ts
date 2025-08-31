import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../core/AppError';

export const checkRole = ( ...allowedRoles: string[] ) => {
    
    return ( req: Request, res: Response, next: NextFunction ) => {
        
        const user = req.user;

        if( !user ) return next( new AppError('No se encontró información de usuario en la petición.', 500 ) );

        if( !allowedRoles.includes( user.role ) ) return next( new AppError('No tienes permiso para realizar esta acción.', 403 ) );

        return next();

    };

};