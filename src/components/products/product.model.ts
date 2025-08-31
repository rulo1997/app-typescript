import { Model, DataTypes, CreationOptional, ForeignKey, BelongsToGetAssociationMixin } from 'sequelize';

import sequelize from '../../config/database';
import User from '../users/user.model';

export interface ProductAttributes {
    id?: CreationOptional<number>;
    name: string;
    description: string;
    price: number;
    stock: number;
    userId?: ForeignKey<User['id']>;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
    public id!: CreationOptional<number>;
    public name!: string;
    public description!: string;
    public price!: number;
    public stock!: number;
    public userId!: ForeignKey<User['id']>;
    public readonly user?: User;
    public getUser!: BelongsToGetAssociationMixin<User>;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    },
    {
        tableName: 'products',
        timestamps: false,
        sequelize,
    }
);

export default Product;