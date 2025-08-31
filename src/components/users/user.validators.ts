import { check } from 'express-validator';

import { userService } from './user.service';
import validarCampos from '../../api/middlewares/validar-campos';

const existsEmail = async ( value: string ): Promise<MapConstructor | void> => {

    const emailTaken = await userService.isEmailTaken( value );
    if( emailTaken ) return Promise.reject();

}

export const createUserValidator = [
    check('name', 'El nombre es obligatorio').not().isEmpty().trim(),
    check('username', 'El apellido es obligatorio').not().isEmpty().trim(),
    check('role', 'El role es obligatorio').not().isEmpty().trim(),
    check('email', 'El email no es válido o ya está en uso')
        .isEmail()
        .normalizeEmail()
        .custom( existsEmail ),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos,
];



// Aquí podrías exportar otros validadores en el futuro
// export const updateUserValidator = [ ... ];
// export const loginValidator = [ ... ];