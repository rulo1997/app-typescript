import { Model, DataTypes, CreationOptional, ForeignKey } from 'sequelize';

import sequelize from '../../config/database';
import Order from './order.model';
import Product from '../products/product.model';

export interface OrderItemAttributes {
    id?: CreationOptional<number>;
    orderId: ForeignKey<Order['id']>;
    productId: ForeignKey<Product['id']>;
    quantity: number;
    price: number; // Precio en el momento de la compra
}

class OrderItem extends Model<OrderItemAttributes> implements OrderItemAttributes {
    public id!: CreationOptional<number>;
    public orderId!: ForeignKey<Order['id']>;
    public productId!: ForeignKey<Product['id']>;
    public quantity!: number;
    public price!: number;
}

OrderItem.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED
        ,autoIncrement: true
        ,primaryKey: true
    },
    orderId: {
        type: DataTypes.INTEGER.UNSIGNED
        ,allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER.UNSIGNED
        ,allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED
        ,allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL( 10 , 2 )
        ,allowNull: false
    },
},
{
    tableName: 'order_items'
    ,sequelize
    ,timestamps: false
});

export default OrderItem;