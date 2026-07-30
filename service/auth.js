const jwt = require("jsonwebtoken");
const secretKey = "lwgfodel";
function setUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
    };
    return jwt.sign(payload, secretKey);
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secretKey);
}

module.exports = {
    setUser,
    getUser,
}