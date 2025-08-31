import { Model, DataTypes, CreationOptional } from 'sequelize';
import sequelize from '../../config/database';

export interface PermissionAttributes {
    id: CreationOptional<number>;
    action: string;
    resource: string;
}

class Permission extends Model<PermissionAttributes> implements PermissionAttributes {
    public id!: CreationOptional<number>;
    public action!: string;
    public resource!: string;
}

Permission.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED
            ,autoIncrement: true
            ,primaryKey: true
        },
        action: {
            type: DataTypes.STRING(50)
            ,allowNull: false
        },
        resource: {
            type: DataTypes.STRING(50)
            ,allowNull: false
        },
    },
    {
        tableName: 'permissions',
        timestamps: false,
        indexes: [{ unique: true, fields: ['action', 'resource'] }],
        sequelize,
    }
);

export default Permission;