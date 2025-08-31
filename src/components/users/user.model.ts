import { Model , DataTypes , CreationOptional } from 'sequelize';
import sequelize from '../../config/database';

export interface UserAttributes {
    id?: CreationOptional<number>;
    name: string;
    username: string;
    email: string;
    password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: CreationOptional<number>;
    public name!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        sequelize,
    }
);

export default User;