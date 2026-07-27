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
    return res.render('home',{
        id: shortID,
    })
}

async function handleRedirectURL(req, res) {
    const shortId = req.params.shortId;
    
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                },
            }
        }
    );

    // Add this safety check: If no matching shortId is found, return a 404 error
    if (!entry) {
        return res.status(404).send("Shortened URL not found");
    }

    // Now it is safe to redirect
    res.redirect(entry.redirectURL);
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirectURL,
}