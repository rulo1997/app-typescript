import { Router } from 'express';

import { productController } from '../../components/products/product.controller';
import { createProductValidator } from '../../components/products/product.validators';

const router = Router();

router.get('/', productController.products );

router.post('/', createProductValidator , productController.create );

// Aquí irían otras rutas como:
// router.get('/:id', userController.getById);
// router.put('/:id', userController.update);

export default router;