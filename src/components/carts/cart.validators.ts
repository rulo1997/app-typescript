import { check } from 'express-validator';

import validarCampos from '../../api/middlewares/validar-campos';

export const addItemRules = [
    check('productId', 'El ID del producto es requerido y debe ser un número.').isInt({ min: 1 }),
    check('quantity', 'La cantidad es requerida y debe ser un número.').isInt({ min: 1 }),
    validarCampos,
];