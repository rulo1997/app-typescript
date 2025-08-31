import { Model, DataTypes, CreationOptional, BelongsToManyGetAssociationsMixin } from 'sequelize';
import sequelize from '../../config/database';
import Permission from '../permissions/permission.model';

export interface RoleAttributes {
    id?: CreationOptional<number>;
    name: string;
    description?: string;
}

class Role extends Model<RoleAttributes> implements RoleAttributes {
    public id!: CreationOptional<number>;
    public name!: string;
    public description!: string;
    public readonly permissions?: Permission[];
    public getPermissions!: BelongsToManyGetAssociationsMixin<Permission>;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED
            ,autoIncrement: true
            ,primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50)
            ,allowNull: false
            ,unique: true
        },
        description: {
            type: DataTypes.STRING(255)
            ,allowNull: true
        },
    },
    {
        tableName: 'roles',
        timestamps: false, // Los roles no necesitan timestamps
        sequelize,
    }
);

export default Role;