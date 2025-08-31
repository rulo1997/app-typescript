// src/components/auth/auth.routes.ts
import { Router } from 'express';

import { authController } from '../../components/auth/auth.controller';
import { loginRules } from '../../components/auth/auth.validators';

const router = Router();

router.post('/login', loginRules , authController.login);

export default router;