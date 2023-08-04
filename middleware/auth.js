const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_Secret_Key;
module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).send("Access denied. No token provided");
        return;
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send("Invalid token");
    }
};