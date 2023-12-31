const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// export as a mongoose model
module.exports = mongoose.model('User', UserSchema);