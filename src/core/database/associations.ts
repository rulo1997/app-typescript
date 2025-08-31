import User from '../../components/users/user.model';
import Product from '../../components/products/product.model';

export const setupAssociations = () => {
    
    User.hasMany( Product, {
        foreignKey: 'userId',
        as: 'products',
    });

    Product.belongsTo( User, {
        foreignKey: 'userId',
        as: 'user',
    });

    console.log("✅ Asociaciones configuradas correctamente.");

};