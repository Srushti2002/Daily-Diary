const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define the user Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    createdAt: { 
        type: Date, 
        default: Date.now 
    }

});

userSchema.pre('save', async function(next) {
    const user = this;

    //hash the password only if it has been modified (or is new)
    if(!user.isModified('password')) return next();

    try{
        //generate salt
        const salt = await bcrypt.genSalt(10);

        //hash password generation
        const hashedPassword = await bcrypt.hash(user.password, salt);

        //hash the password
        this.password = hashedPassword;

        next();
    }
    catch(err) {
        return next(err);
    }

});

userSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err) {
        throw err;
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;