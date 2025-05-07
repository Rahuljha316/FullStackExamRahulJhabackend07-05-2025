const express = require('express');

const { addToCart } = require('../controllers/CartController');
const isAuthenticated = require('../middlewares/auth');
const router = express.Router();


router.post('/', isAuthenticated, addToCart)



module.exports = router;