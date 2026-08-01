const {nanoid} = require("nanoid");
const URL = require('../models/url');

/**
 * Handles creation of a new short URL for the authenticated user.
 * Validates request body, generates a 9-character unique ID, saves it in MongoDB,
 * and re-renders the home view with updated URL list.
 */
async function handleGenerateNewShortURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({"error": "URL is required"});
    
    // Generate a unique 9-character short ID
    const shortID = nanoid(9);
    
    // Create new URL document in database
    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    
    // Fetch all URLs created by current user to update the UI table
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render('home',{
        id: shortID,
        urls: allUrls,
    });
}

/**
 * Handles redirecting short URL to original URL and recording click history.
 * Pushes timestamp to visitHistory array in MongoDB.
 */
async function handleRedirectURL(req, res) {
    const shortId = req.params.shortId;
    
    // Update visit history and retrieve original URL document
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

    // If no matching shortId is found in database, return 404 error
    if (!entry) {
        return res.status(404).send("Shortened URL not found");
    }

    // Redirect user to the original destination URL
    res.redirect(entry.redirectURL);
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirectURL,
}