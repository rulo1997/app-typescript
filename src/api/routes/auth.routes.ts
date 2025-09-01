// src/components/auth/auth.routes.ts
import { Request, Response, Router } from 'express';

import { authController } from '../../components/auth/auth.controller';
import { loginRules , registerRules } from '../../components/auth/auth.validators';
import passport from 'passport';
import { TokenPayload } from '../../core/types/express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', loginRules , authController.login );

router.post('/register', registerRules , authController.register );

router.get(
    '/google',
    passport.authenticate( 'google', {
        scope: ['profile', 'email'],
        session: false,
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login-failed' }),
    ( req: Request , res: Response ) => {
        
        const userPayload = req.user as TokenPayload;

        const token = jwt.sign(
            userPayload,
            process.env.JWT_SECRET as string,
            { expiresIn: '8h' }
        );

        res.redirect(`http://localhost:4200/auth/social-login?token=${ token }`);

    }
);

export default router;