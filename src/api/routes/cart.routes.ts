import { Router } from 'express';

import { cartController } from '../../components/carts/cart.controller';
import { addItemRules } from '../../components/carts/cart.validators';

const router = Router();

router.get('/' , cartController.getMyCart );

router.post('/items' , addItemRules , cartController.addProductToCart );

router.delete('/items/:productId' , cartController.removeProductFromCart );

export default router;