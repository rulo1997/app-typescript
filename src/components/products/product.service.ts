import { InferCreationAttributes } from 'sequelize';

import { productRepository, ProductRepository } from './product.repository';
import Product , { ProductAttributes } from './product.model';

type CreateProductDto = InferCreationAttributes<Product>;

export class ProductService {

    constructor( private repository: ProductRepository = productRepository ) {}

    public async createProduct( productData: CreateProductDto ): Promise<ProductAttributes> {

        const newProduct = await this.repository.create( productData );

        const product = newProduct.get({ plain: true });
        
        return product;

    }

    public async getProducts(): Promise<ProductAttributes[] | []> {

        const users = await this.repository.findAllProducts();

        return users;

    }
    
    // Aquí irían otros métodos como:
    // - getUserById(id: number)
    // - updateUser(id: number, data: Partial<CreateUserDto>)

}

export const productService = new ProductService();