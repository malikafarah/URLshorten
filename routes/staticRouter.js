const express = require("express");
const url = require("../models/url");

const router = express.Router();

router.get('/',async (req,res) => {
    const allurls = await url.find({});
    return res.render("home");
})

router.get('/user/signup', (req,res) =>{
    return res.render('signup');
})

module.exports = router;