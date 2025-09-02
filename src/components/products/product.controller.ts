import { Request, Response } from 'express';

import { productService, ProductService } from './product.service';
import { PaginationOptions, ProductFilters } from './product.types';

export class ProductController {

    constructor( private service: ProductService = productService ) {}

    public create = async( req: Request , res: Response ): Promise<void> => {

        const productData = req.body;

        const newProduct = await this.service.createProduct( productData );

        res.status( 201 ).json( newProduct );

    };

    public getProducts = async( req: Request , res: Response ): Promise<void> => {

        const products = await this.service.getProducts();

        res.status( 201 ).json( products );

    }

    public getProductsPagineted = async( req: Request , res: Response ): Promise<void> => {

        const { options , filters }: { options: PaginationOptions , filters: ProductFilters } = req.body;

        const products = await this.service.getPaginatedProducts( options , filters );

        res.status( 201 ).json( products );

    }

}

export const productController = new ProductController();