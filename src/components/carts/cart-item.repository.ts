import CartItem from './cart-item.model';

export class CartItemRepository {
    
    public async findByCartAndProduct( cartId: number , productId: number ): Promise<CartItem | null> {

        return CartItem.findOne({ where: { cartId, productId } });

    }

    public async create( data: { cartId: number, productId: number, quantity: number }): Promise<CartItem> {

        return CartItem.create( data );

    }

    public async updateQuantity( item: CartItem , quantity: number ): Promise<CartItem> {

        item.quantity = quantity;
        return item.save();

    }

    public async delete( itemId: number ): Promise<number> {

        return CartItem.destroy({ where: { id: itemId } });

    }

}

export const cartItemRepository = new CartItemRepository();