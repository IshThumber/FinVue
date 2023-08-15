const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    try {
        const token = req.header("token");

        if (!token) {
            return res
                .status(401)
                .json({ message: "Access denied. Token missing." });
        }

        const decoded = jwt.verify(token, secretKey);
        req.username = decoded.username;
        // Attach the decoded user information to the request object
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: "Access denied. Invalid token." });
    }
};
