const Order = require("../models/sql/Order");
const OrderItem = require("../models/sql/OrderItem");


const getAllOrders = async (req, res) => {
    try {
        const userId = req.user.userId;

        const orders = await Order.findAll({
            where: { userId },
            include: [
                {
                    model: OrderItem,
                    attributes: ['productId', 'quantity']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ data: orders });
    } catch (error) {
        console.error('Get Orders Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = getAllOrders;
