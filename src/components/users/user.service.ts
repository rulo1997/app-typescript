import bcrypt from 'bcryptjs';
import { InferCreationAttributes } from 'sequelize';

import { userRepository, UserRepository } from './user.repository';
import User , { UserAttributes } from './user.model';

type CreateUserDto = InferCreationAttributes<User>;

export class UserService {

    constructor( private repository: UserRepository = userRepository ) {}

    public async createUser( userData: CreateUserDto ): Promise<Omit<UserAttributes, 'password'>> {

        const existingUser = await this.repository.findByEmail( userData.email );

        if( existingUser ) throw new Error('El correo electrónico ya está en uso.');

        const hashedPassword = await bcrypt.hash( userData.password , 10 );

        const newUser = await this.repository.create({
            ...userData,
            password: hashedPassword,
        });

        const { password , ...userWithoutPassword } = newUser.get({ plain: true });
        
        return userWithoutPassword;

    }

    public async getUsers(): Promise<User[] | []> {

        const users = await this.repository.findAllUsers();

        return users;

    }
    
    // Aquí irían otros métodos como:
    // - getUserById(id: number)
    // - updateUser(id: number, data: Partial<CreateUserDto>)

}

export const userService = new UserService();