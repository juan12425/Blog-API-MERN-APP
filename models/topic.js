const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a topic name'],
        maxLength: 20
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    }
}, {timestamps: true})

module.exports = mongoose.model('Topic', TopicSchema)