// External packages
const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");

// Internal modules
const { connectMongoDB } = require('./connections');
const { checkForAuthentication, restrictTo } = require('./middleware/auth');

// Route modules
const staticRoute = require('./routes/staticRouter');
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

// Server initialization
const app = express();
const PORT = 8001;

// Connect to MongoDB database
connectMongoDB('mongodb://127.0.0.1:27017/short-url');

// View engine configuration
app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

// Middleware setup
app.use(express.json()); // Body parser for JSON payloads
app.use(express.urlencoded({ extended: false })); // Body parser for form submissions
app.use(cookieParser()); // Middleware to parse HTTP cookies
app.use(checkForAuthentication);

// Route mounting
app.use("/user", restrictTo(["NORMAL","ADMIN"]),userRoute); // Public user authentication routes (signup/login/logout)
app.use("/url", urlRoute); // Protected short URL generation and redirect routes
app.use("/", staticRoute); // Main application UI routes

// Start server
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
