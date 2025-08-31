import { Router } from 'express';

import { protect } from '../middlewares/auth.middleware';

import userRoutes from './user.routes';
import productRoutes from './product.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use( '/auth' , authRoutes );
router.use( protect );
router.use( '/users' , userRoutes );
router.use( '/products' , productRoutes );

export default router;