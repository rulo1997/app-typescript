import { Model , DataTypes , CreationOptional, BelongsToManyGetAssociationsMixin } from 'sequelize';

import sequelize from '../../config/database';
import Role from '../roles/role.model';

export interface UserAttributes {
    id?: CreationOptional<number>;
    name: string;
    username: string;
    email: string;
    password?: string;
    roles?: Role[];
    getRoles?: BelongsToManyGetAssociationsMixin<Role>;
    googleId: string | null;
    profilePicture: string | null;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: CreationOptional<number>;
    public name!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public readonly roles?: Role[];
    public getRoles!: BelongsToManyGetAssociationsMixin<Role>;
    public googleId!: string | null;
    public profilePicture!: string | null;
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
            allowNull: true,
        },
        googleId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'users',
        timestamps: false,
        sequelize,
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        },
        scopes: {
            withPassword: {
                attributes: {
                    include: ['password']
                }   
            }
        }
    }
);

export default User;