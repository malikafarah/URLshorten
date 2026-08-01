const mongoose = require('mongoose');

// Schema definition for shortened URLs and their analytics history
const urlSchema = new mongoose.Schema({
    // Unique identifier for the shortened URL link
    shortId:{
        type:String,
        required: true,
        unique:true,
    },
    // Original destination URL where users are redirected
    redirectURL:{
        type: String,
        required: true,
    },
    // Tracking array storing timestamps for every redirect/click
    visitHistory:[{timestamp:{type:Number}}],
    // Reference to the user who created this shortened URL
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
},
{timestamps: true}); // Automatically creates createdAt and updatedAt fields

const url = mongoose.model('url',urlSchema);

module.exports = url;