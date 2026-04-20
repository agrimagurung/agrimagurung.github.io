const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Define the user schema
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    hash: String, 
    salt: String,
    role: { type: String, default: 'user'} // RBAC 
});

// Method to set the password (hash + salt)
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// Method to check if the password is valid
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

// Method to generate a JWT token
userSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); // Token expires in 7 days

    // Signing the JWT token
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            role: this.role, // RBAC
            exp: parseInt(expiry.getTime() / 1000, 10),
        }, 
        process.env.JWT_SECRET // Your JWT secret (ensure it's set in .env)
    ); 
};

// Register the model with Mongoose
const User = mongoose.model('User', userSchema);
module.exports = User;
