const mongoose = require("mongoose");

/**
 * Establishes a connection to MongoDB using Mongoose.
 * @param {string} URL - The MongoDB connection connection string.
 */
async function connectMongoDB(URL) {
    return mongoose.connect(URL)
    .then(()=>console.log("MongoDB is connected."))
    .catch((err)=>console.log(`An error has occured error: ${err}`));
}

module.exports = {
    connectMongoDB,
}