import { Model , DataTypes , CreationOptional } from 'sequelize';
import sequelize from '../../config/database';

export interface UserAttributes {
    id?: CreationOptional<number>;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: CreationOptional<number>;
    public firstName!: string;
    public lastName!: string;
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
        firstName: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        lastName: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'users',
        sequelize,
    }
);

export default User;