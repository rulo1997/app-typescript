import { Model , DataTypes , CreationOptional, HasManyGetAssociationsMixin } from 'sequelize';

import sequelize from '../../config/database';
import Product from '../products/product.model';

type UserRole = {
    role: 'admin' | 'customer'
}

export interface UserAttributes {
    id?: CreationOptional<number>;
    name: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: CreationOptional<number>;
    public name!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public role!: UserRole;
    public readonly products?: Product[]; 
    public getProducts!: HasManyGetAssociationsMixin<Product>;
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
        role: {
            type: DataTypes.ENUM('admin', 'customer'),
            allowNull: false,
            defaultValue: 'customer',
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