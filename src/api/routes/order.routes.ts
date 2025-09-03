import { Router } from 'express';

import { orderController } from '../../components/orders/order.controller';

const router = Router();

router.post('/items' , orderController.create );

export default router;