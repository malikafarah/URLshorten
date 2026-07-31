const express = require("express");
const url = require("../models/url");

const router = express.Router();

router.get('/',async (req,res) => {
    if(!req.user) return res.redirect("/user/login");
    const allUrls = await url.find({createdBy: req.user._id});
    return res.render("home",{
        urls: allUrls,
    });
})

module.exports = router;