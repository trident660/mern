const mongoose = require('mongoose');

// defina a user schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

// makes it available throughout the app
module.exports = User = mongoose.model('user',UserSchema);
