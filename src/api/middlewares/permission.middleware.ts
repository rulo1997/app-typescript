import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../core/AppError';

export const checkPermission = ( requiredPermission: string ) => {
    
    return ( req: Request , res: Response , next: NextFunction ) => {
        
        const userPermissions = req.user?.permissions;

        if( userPermissions && userPermissions.includes( requiredPermission ) ) return next();

        return next( new AppError('No tienes los permisos necesarios para realizar esta acción.', 403 ) );

    };

};