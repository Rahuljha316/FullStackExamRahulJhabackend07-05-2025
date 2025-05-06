const express = require('express');
const { addProduct, getProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/ProductController');
const isAuthenticated = require('../middlewares/auth');
const router = express.Router();

router.get("/", isAuthenticated, getProduct)
router.get("/:id", isAuthenticated, getProductById)
router.post("/", isAuthenticated, addProduct)
router.put("/:id", isAuthenticated, updateProduct)
router.delete("/:id", isAuthenticated, deleteProduct)



module.exports = router;