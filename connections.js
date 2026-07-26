const mongoose = require("mongoose");

async function connectMongoDB(URL) {
    return mongoose.connect(URL)
    .then(()=>console.log("MongoDB is connected."))
    .catch((err)=>console.log(`An error has occured error: ${err}`));
}

module.exports = {
    connectMongoDB,
}