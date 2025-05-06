const { DataTypes } = require('sequelize')
const sequelize = require('../../config/sql');
const User = require('./User');

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

}, {
    timestamps: true
});

Order.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Order, { foreignKey: "userId" })


module.exports = Order;