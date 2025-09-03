import { Router } from 'express';

import { protect } from '../middlewares/auth.middleware';

import userRoutes from './user.routes';
import productRoutes from './product.routes';
import authRoutes from './auth.routes';
import cartRoutes from './cart.routes';

const router = Router();

router.use( '/auth' , authRoutes );
router.use( protect );
router.use( '/users' , userRoutes );
router.use( '/products' , productRoutes );
router.use( '/carts' , cartRoutes );

export default router;