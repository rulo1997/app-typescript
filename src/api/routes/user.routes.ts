import { Router } from 'express';

import { userController } from '../../components/users/user.controller';
import { checkPermission } from '../middlewares/permission.middleware';

import { updateUserValidator } from '../../components/users/user.validators';

const router = Router();

router.get('/', checkPermission('read:user') , userController.getUsers );

router.put('/:id', checkPermission('update:user') , updateUserValidator , userController.updateUser );

// Aquí irían otras rutas como:
// router.get('/:id', userController.getById);
// router.put('/:id', userController.update);

export default router;