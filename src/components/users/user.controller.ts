import { Request, Response } from 'express';

import { userService, UserService } from './user.service';

export class UserController {

    constructor( private service: UserService = userService ) {}

    public create = async( req: Request , res: Response ): Promise<void> => {

        const userData = req.body;

        const newUser = await this.service.createUser( userData );

        res.status( 201 ).json( newUser );

    };

    public users = async( req: Request , res: Response ): Promise<void> => {

        const users = await this.service.getUsers();

        res.json({ msg: 'OK' , users });

    }

    // Aquí irían otros métodos como:
    // - getById = async (req: Request, res: Response) => { ... }
    // - update = async (req: Request, res: Response) => { ... }
}

export const userController = new UserController();