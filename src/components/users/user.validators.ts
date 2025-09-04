import { body, check , param } from 'express-validator';

import { userService } from './user.service';
import validarCampos from '../../api/middlewares/validar-campos';

const existsEmail = async( value: string ): Promise<MapConstructor | void> => {

    const emailTaken = await userService.isEmailTaken( value );
    if( emailTaken ) return Promise.reject();

}

const existUserById = async( value: number ): Promise<MapConstructor | void> => {

    const isValid = await userService.isValidUserId( value );
    if( !isValid ) return Promise.reject(`No existe un usuario con el id ${ value }`);

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

export const updateUserValidator = [
    param('id','El id es obligatorio').not().isEmpty()
        .custom( existUserById ),
    body()
        .custom( ( value , { req }) => {

            const body = req.body;

            if( Object.keys( body ).length === 0 )
                throw new Error('El cuerpo de la petición no puede estar vacío. Debes enviar al menos un campo para actualizar.');

            const allowedFields = ['name', 'username', 'email', 'password']; // Lista de campos que SÍ se pueden actualizar
            const receivedFields = Object.keys( body );

            const invalidFields = receivedFields.filter( field => !allowedFields.includes( field ));

            if( invalidFields.length > 0 )
                throw new Error(`El/los campo(s) '${ invalidFields.join(', ') }' no son permitidos para actualizar.`);

            return true;

        }),
    validarCampos
];

export const deleteUserValidator = [
    param('id','El id es obligatorio').not().isEmpty()
        .custom( existUserById ),
    validarCampos
];