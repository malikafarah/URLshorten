const express = require('express');
const {connectMongoDB} = require('./connections');
const app = express();

const urlRoute = require("./routes/url");
const PORT = 8001;

connectMongoDB('mongodb://127.0.0.1:27017/short-url');

app.use(express.json());
app.use("/url",urlRoute);

app.listen(PORT,()=> console.log(`Server Started at PORT: ${PORT}`));
