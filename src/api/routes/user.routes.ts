import { Router } from 'express';
import { body } from 'express-validator';

import { userController } from '../../components/users/user.controller';
import validarCampos from '../middlewares/validar-campos';

const router = Router();

router.get('/', userController.users );

router.post('/', [
    body(['name','username','email','password'] , 'Los campos son obligatorios').not().isEmpty()
    ,validarCampos
] , userController.create );

// Aquí irían otras rutas como:
// router.get('/:id', userController.getById);
// router.put('/:id', userController.update);

export default router;