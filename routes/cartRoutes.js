const express = require('express');

const { addToCart, getUserCart } = require('../controllers/CartController');
const isAuthenticated = require('../middlewares/auth');
const router = express.Router();


router.post('/', isAuthenticated, addToCart)
router.get('/', isAuthenticated, getUserCart)



module.exports = router;