import { Model, DataTypes, CreationOptional, ForeignKey } from 'sequelize';

import sequelize from '../../config/database';
import Cart from './cart.model';
import Product from '../products/product.model';

export interface CartItemAttributes {
    id?: CreationOptional<number>;
    quantity: number;
    cartId: ForeignKey<Cart['id']>;
    productId: ForeignKey<Product['id']>;
}

class CartItem extends Model<CartItemAttributes> implements CartItemAttributes {
    public id!: CreationOptional<number>;
    public quantity!: number;
    public cartId!: ForeignKey<Cart['id']>;
    public productId!: ForeignKey<Product['id']>;
    public readonly product!: Product;
}

CartItem.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
        },
        cartId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        tableName: 'cart_items',
        sequelize,
        timestamps: false,
    }
);

export default CartItem;