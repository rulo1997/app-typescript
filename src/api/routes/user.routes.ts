import { Router } from 'express';

import { userController } from '../../components/users/user.controller';
import { checkPermission } from '../middlewares/permission.middleware';

import { deleteUserValidator, updateUserValidator } from '../../components/users/user.validators';

const router = Router();

router.get('/', checkPermission('read:user') , userController.getUsers );

router.put('/:id', checkPermission('update:user') , updateUserValidator , userController.updateUser );

router.delete('/:id', checkPermission('delete:user') , deleteUserValidator , userController.deleteUser );

export default router;