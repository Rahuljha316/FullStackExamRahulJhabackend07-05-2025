const User = require("../models/sql/User");
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;


const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and Password are required'
            })
        }

        const user = await User.findOne({ where: { email: email } })
        
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(400).json({
                message: "Invalid Email or password "
            })
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "2d" }
        )
        return res.status(200).json({ token: token, message: "Login Successful" })

    } catch (error) {
        console.error("Error", error)
        return res.status(500).json({ message: "Server Error" })
    }

};

const register = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and Password are required'
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid Email format"
            })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                message: "Use Strong Password"
            })
        }

        const existingUser = await User.findOne({ where: { email: email } })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const sanitizedEmail = validator.normalizeEmail(email)
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({ email: sanitizedEmail, password: hashedPassword })
        return res.status(201).json({ message: "User Registered Successfully" })

    } catch (error) {
        console.error("Error", error)
        return res.status(500).json({ message: "Server Error" })
    }
}

module.exports = {
    login, register
}