const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define the Entry Schema
const entrySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // 🔹 Reference to User model
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    editedAt: {
        type: Date,
        default: Date.now
    }
});

const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;