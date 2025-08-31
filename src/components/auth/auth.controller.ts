import { Request, Response, NextFunction } from 'express';

import { authService } from './auth.service';

class AuthController {

    public login = async( req: Request , res: Response , next: NextFunction ) => {

        const { email, password } = req.body;

        const result = await authService.login( email , password );

        res.status( 200 ).json( result );

    }

}

export const authController = new AuthController();