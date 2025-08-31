import { check } from 'express-validator';

import validarCampos from '../../api/middlewares/validar-campos';

export const loginRules = [
    check('email', 'El email es requerido')
        .isEmail(),
    check('password', 'La contraseña es requerida')
        .not()
        .isEmpty(),
    validarCampos,
];