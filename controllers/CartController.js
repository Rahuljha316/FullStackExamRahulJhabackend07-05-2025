const Cart = require('../models/mongo/Cart');
const Product = require('../models/mongo/Product');
const Order = require('../models/sql/Order');
const OrderItem = require('../models/sql/OrderItem');
const User = require('../models/sql/User');

const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.user.userId;
        // console.log(req)
        console.log(userId, 'userId')
        if (!productId) {
            return res.status(400).json({ message: 'productId is required' });
        }

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity }]
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            console.log(itemIndex, 'itemindex')
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        const saved = await cart.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error('Add to Cart Error:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};
const getUserCart = async (req, res) => {
    try {
        const userId = req.user.userId

        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({
            data: cart,
        });
    } catch (err) {
        console.error('Fetch Cart Error:', err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const removeItemFromCart = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user.userId

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        await cart.save();

        res.status(200).json({
            message: 'Item removed successfully',
            data: cart,
        });
    } catch (err) {
        console.error('Error removing item from cart:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const checkout = async (req, res) => {
    try {
        const userId = req.user.userId;


        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }


        const totalAmount = cart.items.reduce((total, item) => total + item.productId.price * item.quantity, 0);


        const order = await Order.create({
            userId,
            totalAmount
        });

        const orderItems = cart.items.map(item => ({
            orderId: order.id,
            productId: item.productId._id.toString(),
            quantity: item.quantity
        }));

        await OrderItem.bulkCreate(orderItems);

        cart.items = [];
        await cart.save();

        res.status(200).json({
            message: 'Checkout successful!',
            orderId: order.id,
            totalAmount
        });
    } catch (error) {
        console.error('Checkout Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { addToCart, getUserCart, removeItemFromCart, checkout };
