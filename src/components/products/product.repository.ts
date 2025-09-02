import { FindAndCountOptions, InferCreationAttributes } from 'sequelize';
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

    public async findAndCountAllProducts( options: FindAndCountOptions ): Promise<{ rows: Product[] | []; count: number }> {

        const products = await Product.findAndCountAll( options );

        return products;

    }

}

export const productRepository = new ProductRepository();