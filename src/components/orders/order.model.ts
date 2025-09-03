import { Model, DataTypes, CreationOptional, ForeignKey } from 'sequelize';

import sequelize from '../../config/database';
import User from '../users/user.model';

export type OrderStatus = 'pending' | 'completed' | 'shipped' | 'cancelled';

export interface OrderAttributes {
    id?: CreationOptional<number>;
    userId: ForeignKey<User['id']>;
    total: number;
    status: OrderStatus;
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
    public id!: CreationOptional<number>;
    public userId!: ForeignKey<User['id']>;
    public total!: number;
    public status!: OrderStatus;
}

Order.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED
        ,autoIncrement: true
        ,primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED
        ,allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL( 10 , 2 )
        ,allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'shipped', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
    },
},
{
    tableName: 'orders'
    ,sequelize
    ,timestamps: false
});

export default Order;