import { Request, Response } from 'express';

import { userService, UserService } from './user.service';

export class UserController {

    constructor( private service: UserService = userService ) {}

    public create = async( req: Request , res: Response ): Promise<void> => {

        try {
            
            const userData = req.body;

            const newUser = await this.service.createUser( userData );

            res.status( 201 ).json( newUser );

        } catch( error: any ) {
        
            if( error.message === 'El correo electrónico ya está en uso.') {
                res.status( 409 ).json({ message: error.message }); // 409 Conflict
            } else {
                res.status( 500 ).json({ message: 'Error interno del servidor' });
            }
        }

    };

    public users = async( req: Request , res: Response ): Promise<void> => {

        const users = this.service.getUsers();

        res.json({ msg: 'OK' , users });

    }

    // Aquí irían otros métodos como:
    // - getById = async (req: Request, res: Response) => { ... }
    // - update = async (req: Request, res: Response) => { ... }
}

export const userController = new UserController();