const User = require("../models/user");
const { setUser } = require('../service/auth');

/**
 * Handles user login authentication.
 * Verifies email and password, generates auth cookie on success,
 * or renders error message on failure.
 */
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    // If user not found or credentials mismatch
    if (!user) return res.render('login', {
        error: 'Invalid Username or Password'
    });

    // Generate auth token and set cookie upon successful login
    const token = setUser(user);
    res.cookie('token', token);
    return res.redirect("/");
    
}

/**
 * Handles new user sign up (registration).
 * Creates a new user record in MongoDB, generates a JWT auth cookie,
 * and redirects to the home page.
 */
async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
    });
    // Generate auth token and set cookie
    const token = setUser(user);
    res.cookie('uid', token);
    return res.redirect("/");
}

/**
 * Handles user logout.
 * Clears authentication cookie and redirects to login page.
 */
async function handleUserLogout(req, res) {
    res.clearCookie('uid');
    return res.redirect("/user/login");
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
    handleUserLogout,
}