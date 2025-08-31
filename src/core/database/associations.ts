import User from '../../components/users/user.model';
import Role from '../../components/roles/role.model';
import Permission from '../../components/permissions/permission.model';

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

    console.log("✅ Asociaciones configuradas correctamente.");

};