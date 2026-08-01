const express = require("express");
const {
    handleUserSignUp,
    handleUserLogin,
    handleUserLogout
} = require("../controllers/user");

const router = express.Router();

// GET /user/login - Render user login page
router.get('/login', (req, res) => {
    res.render("login"); 
});

// POST /user/login - Process user login authentication
router.post('/login', handleUserLogin);

// GET /user/signup - Render user signup page
router.get('/signup', (req, res) => {
    res.render("signup");
});

// POST /user/signup - Process user signup registration
router.post('/signup', handleUserSignUp);

// GET /user/logout - Logout user and clear session cookie
router.get('/logout', handleUserLogout);

module.exports = router;