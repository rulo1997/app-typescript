import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Role from '../roles/role.model';
import Permission from '../permissions/permission.model';

import { userRepository } from '../users/user.repository';
import { AppError } from '../../core/AppError';
import User, { UserAttributes } from '../users/user.model';
import { InferAttributes } from 'sequelize';

export class AuthService {
    
    constructor( private userRepo = userRepository ){}

    public async login( email: string , password: string ): Promise<{ token: string ; user: { id: number, email: string } }> {
        
        const user = await this.userRepo.findByEmailWithPassword( email , {
            include: [
                {
                    model: Role,
                    as: 'roles',
                    include: [
                        {
                            model: Permission,
                            as: 'permissions',
                            through: { attributes: [] }, 
                        },
                    ],
                    through: { attributes: [] },
                },
            ],
        });

        if( !user ) throw new AppError('Credenciales inválidas.' , 401 );        

        const isPasswordValid = await bcrypt.compare( password , user.password );

        if( !isPasswordValid ) throw new AppError('Credenciales inválidas.' , 401 );

        const permissionsSet = new Set<string>();
        user.roles?.forEach( role => {

            role.permissions?.forEach( permission => {
                permissionsSet.add(`${ permission.action }:${ permission.resource }`);
            });

        });

        const permissions = Array.from( permissionsSet );

        const jwtPayload = {
            id: user.id
            ,email: user.email
            ,permissions
        };

        const token = jwt.sign(
            jwtPayload,
            process.env.JWT_SECRET as string,
            { expiresIn: '8h' }
        );

        const userResponse = { id: user.id, email: user.email }
        
        return {
            token
            ,user: userResponse
        }

    }

    public async register( body: InferAttributes<User> ): Promise<Omit<InferAttributes<User> , 'password'>> {

        const user = await this.userRepo.findByEmail( body.email );

        if( user ) throw new AppError(`Ya existe un usuario con el email ${ body.email }` , 401 );

        const hashedPassword = await bcrypt.hash( body.password , 10 );

        const newUser = await this.userRepo.create({ ...body , password: hashedPassword });

        const { password , ...userWithoutPassword } = newUser.get({ plain: true });

        return userWithoutPassword as Omit<InferAttributes<User>, 'password'>;

    }

}

export const authService = new AuthService();