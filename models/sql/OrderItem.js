const { DataTypes } = require('sequelize')
const sequelize = require('../../config/sql');
const Order = require('./Order');

const OrderItem = sequelize.define("OrderItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
})
OrderItem.belongsTo(Order, { foreignKey: 'orderId' })
Order.hasMany(OrderItem, { foreignKey: "orderId" })

module.exports = OrderItem;