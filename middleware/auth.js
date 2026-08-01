const {getUser} = require("../service/auth");

/**
 * Middleware that restricts route access to logged-in users only.
 * Redirects to the login page if no valid user token cookie is present.
 */
async function restrictToLoggedinUserOnly(req,res,next) {
    const userUid = req.cookies?.uid;

    if(!userUid) return res.redirect("/user/login");
    const user = getUser(userUid);

    if(!user) return res.redirect("/user/login");

    // Attach user payload to request object and proceed to next handler
    req.user = user;
    next();
}

/**
 * Middleware that checks authentication status without enforcing login.
 * Attaches user to req.user if authenticated, or null/undefined if not logged in.
 */
async function checkAuth(req,res,next) {
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    // Attach user (or null) to request object
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
}