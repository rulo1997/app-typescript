import Cart from './cart.model';
import CartItem from './cart-item.model';
import Product from '../products/product.model';

export class CartRepository {

    public async findOrCreateByUser( userId: number ): Promise<Cart> {

        const [ cart ] = await Cart.findOrCreate({
            where: { userId },
            defaults: { userId },
            include: [
                {
                    model: CartItem,
                    as: 'items',
                    include: [
                        {
                            model: Product,
                            as: 'product'
                        }
                    ]
                }
            ],
            order: [
                [{ model: CartItem, as: 'items' }, 'id', 'ASC']
            ]
        });

        return cart;

    }
}

export const cartRepository = new CartRepository();