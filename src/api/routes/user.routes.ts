import { Router } from 'express';

import { userController } from '../../components/users/user.controller';
import { checkPermission } from '../middlewares/permission.middleware';

const router = Router();

router.get('/', checkPermission('read:user') , userController.users );

// Aquí irían otras rutas como:
// router.get('/:id', userController.getById);
// router.put('/:id', userController.update);

export default router;