const Cart = require('../models/mongo/Cart');
const Product = require('../models/mongo/Product');
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

module.exports = { addToCart };
