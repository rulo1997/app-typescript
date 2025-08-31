import { Request, Response } from 'express';

import { productService, ProductService } from './product.service';

export class ProductController {

    constructor( private service: ProductService = productService ) {}

    public create = async( req: Request , res: Response ): Promise<void> => {

        const productData = req.body;

        const newProduct = await this.service.createProduct( productData );

        res.status( 201 ).json( newProduct );

    };

    public products = async( req: Request , res: Response ): Promise<void> => {

        const products = await this.service.getProducts();

        res.status( 201 ).json( products );

    }

    // Aquí irían otros métodos como:
    // - getById = async (req: Request, res: Response) => { ... }
    // - update = async (req: Request, res: Response) => { ... }
}

export const productController = new ProductController();