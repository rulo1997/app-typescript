import { check } from 'express-validator';

import validarCampos from '../../api/middlewares/validar-campos';

export const createProductValidator = [
    check('name', 'El nombre es obligatorio').not().isEmpty().trim(),
    check('description', 'La descripción es obligatoria').not().isEmpty().trim(),
    check('price', 'El precio es obligatorio').isFloat({ locale: 'ar' }),
    validarCampos,
];

// Aquí podrías exportar otros validadores en el futuro
// export const updateUserValidator = [ ... ];
// export const loginValidator = [ ... ];