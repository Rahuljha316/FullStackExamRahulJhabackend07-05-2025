const { Sequelize } = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.SQL_DB,
    process.env.SQL_USER,
    process.env.SQL_PASSWORD,
    {
        host: process.env.SQL_HOST,
        dialect: process.env.SQL_DIALECT
    }
);

module.exports = sequelize;