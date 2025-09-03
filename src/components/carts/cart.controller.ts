import { Request, Response, NextFunction } from 'express';

import { cartService, CartService } from './cart.service';
import { TokenPayload } from '../../core/types/express';

export class CartController {

    constructor( private service: CartService = cartService ) {}

    public getMyCart = async( req: Request , res: Response , next: NextFunction ) => {

        const { id: userId } = req.user as TokenPayload;

        const cartDetails = await this.service.getCart( userId );

        res.status( 200 ).json( cartDetails );

    };

    public addProductToCart = async( req: Request , res: Response , next: NextFunction ) => {

        const { id: userId } = req.user as TokenPayload;
        const { productId, quantity } = req.body;
        
        const updatedCart = await this.service.addProduct( userId , productId , quantity );

        res.status( 200 ).json( updatedCart );

    };
    
    public removeProductFromCart = async( req: Request , res: Response , next: NextFunction ) => {

        const { id: userId } = req.user as TokenPayload;
        const { productId } = req.params;
        
        const updatedCart = await this.service.removeProduct( userId , parseInt( productId , 10 ) );

        res.status( 200 ).json( updatedCart );

    };

}

export const cartController = new CartController();