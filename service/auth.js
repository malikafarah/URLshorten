const jwt = require("jsonwebtoken");

// Secret key used to sign and verify JWT authentication tokens
const secretKey = "lwgfodel";

/**
 * Creates and signs a JWT authentication token for a user.
 * @param {Object} user - User document containing _id and email
 * @returns {string} Signed JWT token
 */
function setUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
    };
    return jwt.sign(payload, secretKey);
}

/**
 * Verifies a JWT token and extracts the encoded user payload.
 * @param {string} token - JWT token string
 * @returns {Object|null} Decoded user payload if valid, otherwise null
 */
function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}