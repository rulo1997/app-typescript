import { Request, Response } from 'express';

import { userService, UserService } from './user.service';

export class UserController {

    constructor( private service: UserService = userService ) {}

    public create = async( req: Request , res: Response ): Promise<void> => {

        const userData = req.body;

        const newUser = await this.service.createUser( userData );

        res.status( 201 ).json( newUser );

    };

    public getUsers = async( req: Request , res: Response ): Promise<void> => {

        const users = await this.service.getUsers();

        res.json({ msg: 'OK' , users });

    }

    public updateUser = async( req: Request , res: Response ): Promise<void> => {

        const body = req.body;
        const { id } = req.params;

        console.log({ id , body });

        const users = await this.service.updateUser( Number( id ) , body );

        res.json({ msg: 'OK' , users });

    }

}

export const userController = new UserController();