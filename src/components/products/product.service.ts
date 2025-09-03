import { InferCreationAttributes, Op, WhereOptions } from 'sequelize';

import { productRepository, ProductRepository } from './product.repository';
import Product , { ProductAttributes } from './product.model';
import redisClient from '../../config/redis';
import { PaginationOptions, ProductFilters } from './product.types';

type CreateProductDto = InferCreationAttributes<Product>;

export class ProductService {

    constructor( private repository: ProductRepository = productRepository ) {}

    public async createProduct( productData: CreateProductDto ): Promise<ProductAttributes> {

        const newProduct = await this.repository.create( productData );

        const product = newProduct.get({ plain: true });

        this.invalidateProductsCache();
        
        return product;

    }

    public async getProducts(): Promise<ProductAttributes[] | []> {

        const users = await this.repository.findAllProducts();

        return users;

    }

    public async getPaginatedProducts( options: PaginationOptions, filters: ProductFilters ) {
        
        const cacheKey = `products:${ JSON.stringify({ options, filters }) }`;

        try {

            const cachedResult = await redisClient.get( cacheKey );
            
            if( cachedResult ) {

                console.log('CACHE HIT ⚡️');
                return JSON.parse( cachedResult );

            }

        } catch( error ) {
            console.error('Error al leer del caché de Redis:', error);
        }

        console.log('CACHE MISS 🐢');
        const offset = ( options.page - 1 ) * options.limit;
        const whereClause: WhereOptions = { /* ... tu lógica de filtros ... */ };

        if( filters.minPrice || filters.maxPrice ) {

            whereClause.price = {};
            if( filters.minPrice ) whereClause.price[ Op.gte ] = filters.minPrice;
            if( filters.maxPrice ) whereClause.price[ Op.lte ] = filters.maxPrice;

        }

        // Consultamos la base de datos como siempre.
        const { count , rows } = await this.repository.findAndCountAllProducts({
            limit: options.limit,
            offset,
            order: [[ options.sortBy , options.order ]],
            where: whereClause,
        });

        const result = {
            totalItems: count,
            totalPages: Math.ceil( count / options.limit ),
            currentPage: options.page,
            products: rows,
        };

        try {

            await redisClient.set( cacheKey , JSON.stringify( result ) );

        } catch( error ) {
            console.error('Error al guardar en el caché de Redis:', error);
        }

        return result;

    }

    private async invalidateProductsCache() {

        try {

            const keys = await redisClient.keys('products:*');
            if( keys.length > 0 ) {

                await redisClient.del( keys );
                console.log('CACHE INVALIDATED 🗑️');

            }

        } catch( error ) {
            console.error('Error al invalidar el caché de Redis:', error);
        }

    }

}

export const productService = new ProductService();