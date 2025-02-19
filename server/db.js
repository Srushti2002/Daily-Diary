const mongoose = require('mongoose');
require('dotenv').config();

//define the mongoDB url
const mongoURL = process.env.MONGODB_URL_LOCAL;

//set up mongoDB connection
mongoose.connect(mongoURL);

//get the default connection
//mongoose maintain a default connection object representing the mongoDB connection
const db = mongoose.connection;

db.on('connection', () => {
    console.log('Connected to MongoDB server')
})

db.on('error', () => {
    console.log('MongoDB connection Errrrrror')
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

module.exports = db;
