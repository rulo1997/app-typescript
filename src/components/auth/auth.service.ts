import { InferAttributes } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../users/user.model';
import Role from '../roles/role.model';
import Permission from '../permissions/permission.model';

import { userRepository } from '../users/user.repository';
import { AppError } from '../../core/AppError';
import { Profile } from 'passport';
import { TokenPayload } from '../../core/types/express';

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

    public async handleGoogleAuth( profile: Profile ): Promise<TokenPayload> {
        
        // 1. Buscamos si ya existe un usuario con este ID de Google.
        let user = await this.userRepo.findByGoogleId( profile.id );

        if( !user ) {

            const userByEmail = await this.userRepo.findByEmail( profile.emails?.[0].value || '' );

            if( userByEmail ) {

                userByEmail.googleId = profile.id;
                userByEmail.profilePicture = profile.photos?.[0].value || '';
                user = await userByEmail.save();

            } else {
                
                // 3. Si no existe de ninguna forma, creamos un nuevo usuario.
                const newUser = await this.userRepo.create({
                    googleId: profile.id,
                    email: profile.emails?.[0].value || '',
                    name: profile.name?.givenName || '',
                    username: profile.name?.familyName || '',
                    profilePicture: profile.photos?.[0].value || '',
                } as User );
                
                user = newUser;

            }

        }

        await user.reload({ include: [{ model: Role, as: 'roles', include: [{ model: Permission, as: 'permissions' }] }] });

        const permissionsSet = new Set<string>();
        user.roles?.forEach( role => {

            role.permissions?.forEach( p => permissionsSet.add(`${ p.action }:${ p.resource }`) );

        });

        const payload: TokenPayload = {
            id: user.id,
            email: user.email,
            permissions: Array.from( permissionsSet ),
        };

        return payload;

    }

}

export const authService = new AuthService();