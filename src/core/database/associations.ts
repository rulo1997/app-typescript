import User from '../../components/users/user.model';
import Role from '../../components/roles/role.model';
import Permission from '../../components/permissions/permission.model';
import Cart from '../../components/carts/cart.model';
import CartItem from '../../components/carts/cart-item.model';
import Product from '../../components/products/product.model';

export const setupAssociations = () => {

    // Usuario <--> Rol (Muchos a Muchos)
    User.belongsToMany( Role, {
        through: 'user_roles',
        foreignKey: 'userId',
        as: 'roles',
        timestamps: false
    });

    Role.belongsToMany( User, {
        through: 'user_roles',
        foreignKey: 'roleId',
        as: 'users',
        timestamps: false
    });

    // Rol <--> Permiso (Muchos a Muchos)
    Role.belongsToMany( Permission, {
        through: 'role_permissions',
        foreignKey: 'roleId',
        as: 'permissions',
        timestamps: false
    });

    Permission.belongsToMany( Role, {
        through: 'role_permissions',
        foreignKey: 'permissionId',
        as: 'roles',
        timestamps: false
    });

    // Usuario <-> Carrito (Uno a Uno)
    User.hasOne( Cart , { foreignKey: 'userId', as: 'cart' });
    Cart.belongsTo( User , { foreignKey: 'userId', as: 'user' });

    // Carrito <-> ItemCarrito (Uno a Muchos)
    Cart.hasMany( CartItem , { foreignKey: 'cartId', as: 'items' });
    CartItem.belongsTo( Cart , { foreignKey: 'cartId', as: 'cart' });
    
    // Producto <-> ItemCarrito (Uno a Muchos)
    Product.hasMany( CartItem , { foreignKey: 'productId', as: 'cartItems' });
    CartItem.belongsTo( Product , { foreignKey: 'productId', as: 'product' });

    console.log("✅ Asociaciones configuradas correctamente.");

};