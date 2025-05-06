const Product = require("../models/mongo/Product");
const mongoose = require('mongoose')

const addProduct = async (req, res) => {
    try {

        const { title, description, price } = req.body;
        if (!title) {
            return res.status(400).json({
                message: "Title is Required"
            })
        }
        if (typeof price !== "number") {
            return res.status(400).json({
                message: "Price must be numeric"
            })
        }
        const product = new Product({ title, description, price });
        const saved = await product.save();
        res.status(201).json(saved)
    } catch (error) {
        console.error("Error", error)
        return res.status(500).json({ message: "Server Error" })
    }

}

const getProduct = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;
        const query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }
        const products = await Product.find(query).skip((page - 1) * limit).limit(parseInt(limit))

        const total = await Product.countDocuments(query)
        res.json({
            data: products,
            total: total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        })
    } catch (error) {
        console.error("Error", error)
        res.status(500).json({ message: 'Server Error' })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const id = req.params.id;
        // console.log(id)
        // console.log(title, description, price)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Id " })
        }
        const product = await Product.findByIdAndUpdate(id, { title, description, price }, { new: true })
        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' })
        }
        res.json(product)
    } catch (error) {
        console.error("Error", error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const getProductById = async (req, res) => {
    try {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Id " })
        }

        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' })
        }
        res.json(product)
    } catch (error) {
        console.error("Error", error)
        res.status(500).json({ message: 'Server Error' })
    }
}
const deleteProduct = async (req, res) => {
    try {

        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json('Invalid Id')
        }
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' })
        }
        res.json({ message: "Product deleted successfully" })
    } catch (error) {
        console.error("Error", error)
        res.status(500).json({ message: 'Server Error' })
    }
}
module.exports = {
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductById
}