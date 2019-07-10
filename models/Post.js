const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        require: true
    },
    timestamp: {
		type: Date,
        default: Date.now,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('posts', postSchema)