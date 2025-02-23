const express = require('express');
const app = express();
require('./db');
const cors = require("cors");
require('dotenv').config();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
    'https://daily-diary-1.onrender.com', // Development Frontend
    'http://localhost:3000'  // Production Frontend
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
const PORT = process.env.PORT || 5000;

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