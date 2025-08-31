import { InferCreationAttributes } from 'sequelize';
import Product from './product.model';

export class ProductRepository {

    public async create( ProductData: InferCreationAttributes<Product> ): Promise<Product> {

        const products = await Product.create( ProductData );

        return products;

    }

    public async findById( id: number ): Promise<Product | null> {

        const products = await Product.findByPk( id );

        return products;

    }

    public async findAllProducts(): Promise<Product[] | []> {

        const products = await Product.findAll();

        return products;

    }

}

export const productRepository = new ProductRepository();