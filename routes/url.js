const express = require("express");
const {
    handleGenerateNewShortURL,
    handleRedirectURL
} = require("../controllers/url");

const router = express.Router();

// POST /url - Route to generate a new short URL
router.post("/", handleGenerateNewShortURL);

// GET /url/:shortId - Route to handle redirection for a short URL
router.get("/:shortId", handleRedirectURL);

module.exports = router;