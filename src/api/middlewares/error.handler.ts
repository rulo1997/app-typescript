import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../core/AppError';

export const errorHandler = ( err: Error , req: Request , res: Response , next: NextFunction ) => {

    console.error( err ); // ¡Siempre registra el error!

    if( err instanceof AppError && err.isOperational ) return res.status( err.statusCode ).json({ msg: err.message });

    return res.status( 500 ).json({ msg: 'Error interno. Hable con el Administrador' });

};