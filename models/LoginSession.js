const mongoose = require('mongoose');

const LoginSessionSchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    startDate: {
        type: Date,
        require: true
    },
    lastLogin: {
        type: Date,
        require: true
    },
    loginCount: {
        type: Number,
        require: true
    }
});