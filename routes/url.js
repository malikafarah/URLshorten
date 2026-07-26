const express = require("express");
const {
    handleGenerateNewShortURL,
    handleRedirectURL
} = require("../controllers/url");
const router = express.Router();
const URL= require("../models/url");

router.post("/",handleGenerateNewShortURL);
router.get("/:shortId",handleRedirectURL);

module.exports = router;