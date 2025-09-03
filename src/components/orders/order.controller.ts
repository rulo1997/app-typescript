import { Request, Response } from 'express';
import { orderService } from './order.service';

class OrderController {

    public create = async( req: Request , res: Response ) => {

        const userId = req.user!.id;
        const order = await orderService.createOrderFromCart( userId );

        res.status( 201 ).json({ msg: 'Orden creada exitosamente', order });

    };

}

export const orderController = new OrderController();