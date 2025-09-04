import { Model, DataTypes, CreationOptional, ForeignKey, BelongsToGetAssociationMixin } from 'sequelize';

import sequelize from '../../config/database';

export interface ProductAttributes {
    id?: CreationOptional<number>;
    name: string;
    description: string;
    price: number;
    stock?: number;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
    public id!: CreationOptional<number>;
    public name!: string;
    public description!: string;
    public price!: number;
    public stock!: number;
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
            unique: true,
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
    },
    {
        tableName: 'products',
        timestamps: false,
        sequelize,
    }
);

export default Product;