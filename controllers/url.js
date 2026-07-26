const {nanoid} = require("nanoid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({"error": "URL is required"});
    const shortID = nanoid(9);
    
    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory: [],
    });
    return res.json({ id: shortID });
}

async function handleRedirectURL(req,res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {$push:
        {
        visitHistory: {
            timestamp: Date.now()
        },
        }
    });
    res.redirect(entry.redirectURL);
}
module.exports = {
    handleGenerateNewShortURL,
    handleRedirectURL,
}