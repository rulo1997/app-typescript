import sequelize from '../../config/database';

import { CartRepository, cartRepository } from '../carts/cart.repository';
import { productRepository, ProductRepository } from '../products/product.repository';
import { orderRepository , OrderRepository } from './order.repository';
import { cartItemRepository, CartItemRepository } from '../carts/cart-item.repository';

import Order from './order.model';

import { AppError } from '../../core/AppError';

export class OrderService {

    constructor(
        private readonly productRepo: ProductRepository = productRepository,
        private readonly cartRepo: CartRepository = cartRepository,
        private readonly cartItemRepo: CartItemRepository = cartItemRepository,
        private readonly orderRepo: OrderRepository = orderRepository,
    ){}

    public async createOrderFromCart( userId: number ): Promise<Order> {

        const transaction = await sequelize.transaction();

        try {
            
            const cart = await this.cartRepo.findOrCreateByUser( userId );
            const cartItems = cart.items;

            if( !cartItems || cartItems.length === 0 ) throw new AppError('Tu carrito está vacío.', 400 );

            for( const item of cartItems ) {

                const product = await this.productRepo.findById( item.productId ,  transaction );

                if( !product || product.stock < item.quantity ) throw new AppError(`No hay suficiente stock para el producto: ${ product?.name || 'desconocido' }.` , 400 );

            }

            const total = cartItems.reduce( ( sum , item ) => sum + ( item.product.price * item.quantity ) , 0 );
            
            const order = await this.orderRepo.create({ userId , total , status: 'pending' }, transaction );

            const orderItemsData = cartItems.map( item => ({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.product.price,
            }));

            await this.orderRepo.createItems( orderItemsData , transaction );

            for( const item of cartItems ) {

                await this.productRepo.decrementStock( item.productId , item.quantity , transaction );

            }

            await this.cartItemRepo.deleteByCartId( cart.id , transaction );

            await transaction.commit();
            
            return order;

        } catch( error ) {
        
            await transaction.rollback();
            throw error;

        }

    }

}

export const orderService = new OrderService();