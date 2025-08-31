import { Router } from 'express';

import { userController } from '../../components/users/user.controller';
import { createUserValidator } from '../../components/users/user.validators';

const router = Router();

router.get('/', userController.users );

router.post('/', createUserValidator , userController.create );

// Aquí irían otras rutas como:
// router.get('/:id', userController.getById);
// router.put('/:id', userController.update);

export default router;