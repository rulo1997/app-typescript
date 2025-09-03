import { FindAndCountOptions, InferCreationAttributes, Transaction } from 'sequelize';
import Product from './product.model';

export class ProductRepository {

    public async create( ProductData: InferCreationAttributes<Product> ): Promise<Product> {

        const products = await Product.create( ProductData );

        return products;

    }

    public async findById( id: number , transaction?: Transaction ): Promise<Product | null> {

        const products = await Product.findByPk( id , { transaction });

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

      public async decrementStock( productId: number , quantity: number , transaction: Transaction ): Promise<void> {

        await Product.decrement('stock', {
            by: quantity,
            where: { id: productId },
            transaction,
        });

    }

}

export const productRepository = new ProductRepository();