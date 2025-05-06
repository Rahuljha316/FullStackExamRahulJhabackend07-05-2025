const jwt = require("jsonwebtoken")

const isAuthenticated = (req, res, next) => {
    // console.log(req.headers.authorization)
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "No token Provided" });

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenDecode;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports = isAuthenticated;