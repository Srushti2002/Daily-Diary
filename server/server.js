const express = require('express');
const app = express();
require('./db');
const cors = require("cors");
require('dotenv').config();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://daily-diary-1.onrender.com', // Or the actual origin of your frontend
    credentials: true,
}));
const PORT = 5000;

app.get('/', function(req, res) {
    res.send('Welcome to daily diary');
})
const userRoute = require('./routes/userRoute');
const entryRoute = require('./routes/entryRoute');
app.use('/', userRoute);
app.use('/', entryRoute);

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
})