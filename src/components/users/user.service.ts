import bcrypt from 'bcryptjs';
import { InferCreationAttributes } from 'sequelize';

import { userRepository, UserRepository } from './user.repository';
import User , { UserAttributes } from './user.model';

type CreateUserDto = InferCreationAttributes<User>;

export class UserService {

    constructor( private repository: UserRepository = userRepository ) {}

    public async createUser( userData: CreateUserDto ): Promise<Omit<UserAttributes, 'password'>> {

        const hashedPassword = await bcrypt.hash( userData.password , 10 );

        const newUser = await this.repository.create({
            ...userData,
            password: hashedPassword,
        });

        const { password , ...userWithoutPassword } = newUser.get({ plain: true });
        
        return userWithoutPassword;

    }

    public async getUsers(): Promise<UserAttributes[] | []> {

        const users = await this.repository.findAllUsers();

        return users;

    }

    public async updateUser( id: number , body: User ): Promise<void> {

        await this.repository.updateUser( id , body );

    }

    public async deleteUser( id: number ): Promise<void> {

        await this.repository.deleteUser( id );

    }

    /* VALIDACIONES */
    public async isEmailTaken( email: string ): Promise<boolean> {

        const user = await this.repository.findByEmail( email );
        return !!user;

    }

    public async isValidPassword( password: string ): Promise<boolean> {

        const isPasswordValid = await bcrypt.compare( password , password );
        return !!isPasswordValid;

    }

    public async isValidUserId( id: number ): Promise<boolean> {

        const isValid = await this.repository.findById( id );
        return !!isValid;

    }

}

export const userService = new UserService();