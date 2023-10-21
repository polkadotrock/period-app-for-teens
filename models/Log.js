const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    days: {
        type:Array,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    user: {
        type: String,
        required: true,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// export as a mongoose model
module.exports = mongoose.model('Log', LogSchema);