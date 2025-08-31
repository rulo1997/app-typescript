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

export const registerRules = [
    check('name', 'El nombre es obligatorio').not().isEmpty().trim(),
    check('username', 'El apellido es obligatorio').not().isEmpty().trim(),
    check('email', 'El email no es válido o ya está en uso')
        .isEmail()
        .normalizeEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos,
];
