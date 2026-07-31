const express = require('express');
const path = require('path');
const {connectMongoDB} = require('./connections');
const cookieParser = require("cookie-parser");
const {restrictToLoggedinUserOnly,
    checkAuth,
} = require('./middleware/auth');


const staticRoute = require('./routes/staticRouter');
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectMongoDB('mongodb://127.0.0.1:27017/short-url');

app.set("view engine","ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url",restrictToLoggedinUserOnly,urlRoute);
app.use("/user",userRoute);
app.use("/",checkAuth,staticRoute);

app.listen(PORT,()=> console.log(`Server Started at PORT: ${PORT}`));
