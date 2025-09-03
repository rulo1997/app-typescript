import { cartRepository, CartRepository } from './cart.repository';
import { cartItemRepository, CartItemRepository } from './cart-item.repository';
import { productRepository, ProductRepository } from '../products/product.repository';
import { AppError } from '../../core/AppError';

export class CartService {

    constructor(
        private cartRepo: CartRepository = cartRepository,
        private cartItemRepo: CartItemRepository = cartItemRepository,
        private productRepo: ProductRepository = productRepository,
    ) {}

    public async getCart( userId: number ) {

        const cart = await this.cartRepo.findOrCreateByUser( userId );

        const total = cart.items?.reduce( ( sum , item ) => sum + ( item.product.price * item.quantity ) , 0 ) || 0;

        return {
            cart,
            total: parseFloat( total.toFixed( 2 ) ),
        };

    }

    public async addProduct( userId: number , productId: number , quantity: number ) {

        if( quantity <= 0 ) throw new AppError('La cantidad debe ser mayor a cero.', 400);

        const cart = await this.cartRepo.findOrCreateByUser( userId );
        const product = await this.productRepo.findById( productId );

        if( !product ) throw new AppError('Producto no encontrado.', 404);

        if( product.stock < quantity ) throw new AppError('No hay suficiente stock para este producto.', 400);

        let cartItem = await this.cartItemRepo.findByCartAndProduct( cart.id , productId );

        if( cartItem ) {

            const newQuantity = quantity;

            if( product.stock < newQuantity ) {
                throw new AppError('No hay suficiente stock para la cantidad solicitada.', 400);
            }

            await this.cartItemRepo.updateQuantity( cartItem , newQuantity );

        } else {
        
            await this.cartItemRepo.create({ cartId: cart.id , productId , quantity });

        }

        return this.getCart( userId );

    }

    public async removeProduct( userId: number , productId: number ) {

        const cart = await this.cartRepo.findOrCreateByUser( userId );
        const cartItem = await this.cartItemRepo.findByCartAndProduct( cart.id , productId );
        
        if( !cartItem ) throw new AppError('Este producto no se encuentra en tu carrito.', 404);

        await this.cartItemRepo.delete( cartItem.id );
        
        return this.getCart( userId );
    }

}

export const cartService = new CartService();