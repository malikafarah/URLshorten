const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {handleUserSignUp,
    handleUserLogin} = require("../controllers/user");

router.get('/login', (req, res) => {
    res.render("login"); 
});

router.get('/signup', (req, res) => {
    res.render("signup");
});

router.post('/signup', handleUserSignUp);
router.post('/login',handleUserLogin);

module.exports = router;