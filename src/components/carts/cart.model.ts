import { Model, DataTypes, CreationOptional, ForeignKey } from 'sequelize';

import sequelize from '../../config/database';
import User from '../users/user.model';
import CartItem from './cart-item.model';

export interface CartAttributes {
    id?: CreationOptional<number>;
    userId: ForeignKey<User['id']>;
}

class Cart extends Model<CartAttributes> implements CartAttributes {
    public id!: CreationOptional<number>;
    public userId!: ForeignKey<User['id']>;
    public readonly items!: CartItem[];
}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'carts',
        sequelize,
    }
);

export default Cart;