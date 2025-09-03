import { Transaction } from 'sequelize';

import Order, { OrderAttributes } from './order.model';
import OrderItem, { OrderItemAttributes } from './order-item.model';

type OrderCreationAttributes = Omit<OrderAttributes, 'id'>;
type OrderItemCreationAttributes = Omit<OrderItemAttributes, 'id'>;

export class OrderRepository {

    public async create( orderData: OrderCreationAttributes , transaction: Transaction ): Promise<Order> {

        return Order.create( orderData, { transaction });

    }

    public async createItems( itemsData: OrderItemCreationAttributes[] , transaction: Transaction ): Promise<OrderItem[]> {

        return OrderItem.bulkCreate( itemsData, { transaction });

    }
}

export const orderRepository = new OrderRepository();