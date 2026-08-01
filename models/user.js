const mongoose = require('mongoose');

// Schema definition for user accounts
const userSchema = new mongoose.Schema(
    {
        // Full name of the user
        name:{
            type: String,
            required : true,
        },
        // Unique email address used for login
        email:{
            type: String,
            required: true,
            unique : true,
        },
        // Password for user authentication
        password:{
            type: String,
            required: true,
        }
    }
,{timestamps:true} // Automatically manages createdAt and updatedAt timestamps
);

const User = mongoose.model("user", userSchema);
module.exports = User;