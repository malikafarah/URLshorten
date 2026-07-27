const express = require('express');
const path = require('path');
const {connectMongoDB} = require('./connections');
const app = express();
const staticRoute = require('./routes/staticRouter');
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const PORT = 8001;

connectMongoDB('mongodb://127.0.0.1:27017/short-url');

app.set("view engine","ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/test',async (req,res)=>{
    const allUrls = await URL.find({})
    return res.render("home",{
        urls:allUrls,
    });
});

app.use("/url",urlRoute);
app.use("/",staticRoute);

app.listen(PORT,()=> console.log(`Server Started at PORT: ${PORT}`));
