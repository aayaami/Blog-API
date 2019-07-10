const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true
    },
    timestamp: {
		type: Date,
        default: Date.now,
        required: true
    },
    useremail: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'posts'
    }
})

module.exports = mongoose.model('comments', commentSchema)