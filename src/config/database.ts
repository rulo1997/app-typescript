import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST;

const sequelize = new Sequelize( dbName , dbUser , dbPassword , {
    host: dbHost,
    dialect: 'mysql', // O 'postgres', 'sqlite', etc., según tu base de datos
    logging: false, // Ponlo en `true` para ver las consultas SQL en la consola
});

export default sequelize;