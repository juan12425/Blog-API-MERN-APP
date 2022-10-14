const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide a post name'],
        minLength: 1,
        maxLength: 100
    },
    text: {
        type: String,
        required: [true, 'Text cannot be empty'],
        minLength: 10
    },
    createdBy: {
        type: mongoose.Types.ObjectID,
        ref: 'User',
        required: [true, 'Please provide a user']
    },
    relatedTopic: {
        type: mongoose.Types.ObjectID,
        ref: 'Topic',
        required: [true, 'Please provide a related topic id']
    }
})

module.exports = mongoose.model('Post', PostSchema)