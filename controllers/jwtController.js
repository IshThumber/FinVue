const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateJWT(username) {
    const secretKey = process.env.JWT_SECRET;

    const payload = { username: username };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    return token;
}

module.exports = generateJWT;
