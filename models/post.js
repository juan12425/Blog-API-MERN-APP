const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide a post name'],
        maxLength: 100
    },
    text: {
        type: String,
        required: [true, 'Text cannot be empty'],
        minLength: 10
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    },
    relatedTopic: {
        type: mongoose.Types.ObjectId,
        ref: 'Topic',
        required: [true, 'Please provide a related topic id']
    }
}, {timestamps: true})

module.exports = mongoose.model('Post', PostSchema)