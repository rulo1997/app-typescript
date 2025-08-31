// src/components/auth/auth.routes.ts
import { Router } from 'express';

import { authController } from '../../components/auth/auth.controller';
import { loginRules , registerRules } from '../../components/auth/auth.validators';

const router = Router();

router.post('/login', loginRules , authController.login );

router.post('/register', registerRules , authController.register );

export default router;