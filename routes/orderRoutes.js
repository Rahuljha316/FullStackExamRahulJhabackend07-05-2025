const express = require('express');
const isAuthenticated = require('../middlewares/auth');
const getAllOrders = require('../controllers/OrderController');
const router = express.Router();

router.get("/", isAuthenticated, getAllOrders)



module.exports = router;