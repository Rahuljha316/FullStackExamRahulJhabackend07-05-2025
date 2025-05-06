const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: process.env.SQL_DIALECT,
    protocol: process.env.SQL_DIALECT,
    logging: false,
    dialectOptions: {
        ssl: process.env.SQL_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false
    }
});

module.exports = sequelize;
