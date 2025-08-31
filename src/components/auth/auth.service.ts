import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { userRepository } from '../users/user.repository';
import { AppError } from '../../core/AppError';

export class AuthService {
    
    constructor( private userRepo = userRepository ){}

    public async login( email: string , password: string ): Promise<{ token: string ; user: { id: number, email: string } }> {
        
        const user = await this.userRepo.findByEmailWithPassword( email );

        if( !user ) throw new AppError('Credenciales inválidas.' , 401 );

        const isPasswordValid = await bcrypt.compare( password , user.password );

        if( !isPasswordValid ) throw new AppError('Credenciales inválidas.' , 401 );

        const jwtPayload = { id: user.id, email: user.email, role: user.role }

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

}

export const authService = new AuthService();