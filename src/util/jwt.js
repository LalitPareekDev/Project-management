const jwt = require('jsonwebtoken');
const config = require('../config')

const generateToken = (payload) => {
    let token = jwt.sign(payload, config.jwtSecretKey, { expiresIn: '12h'})
    return token;
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwtSecretKey);
    } catch(error) {
        return false;
    }
}

module.exports = { generateToken, verifyToken }
