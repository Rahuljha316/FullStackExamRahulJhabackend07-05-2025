const express = require('express');

const { addToCart, getUserCart, removeItemFromCart, checkout } = require('../controllers/CartController');
const isAuthenticated = require('../middlewares/auth');
const router = express.Router();


router.post('/', isAuthenticated, addToCart)
router.post('/checkout', isAuthenticated, checkout)
router.get('/', isAuthenticated, getUserCart)
router.delete('/item/:id', isAuthenticated, removeItemFromCart)



module.exports = router;