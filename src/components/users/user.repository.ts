import { InferCreationAttributes } from 'sequelize';
import User from './user.model';

export class UserRepository {

    public async create( userData: InferCreationAttributes<User> ): Promise<User> {

        const user = await User.create( userData );
        return user;

    }

    public async findById( id: number ): Promise<User | null> {

        const user = await User.findByPk( id );
        return user;

    }

    public async findByEmail( email: string ): Promise<User | null> {

        const user = await User.findOne({ where: { email } });
        return user;

    }

    public async findAllUsers(): Promise<User[] | []> {

        const users = await User.findAll();
        return users;

    }

}

export const userRepository = new UserRepository();