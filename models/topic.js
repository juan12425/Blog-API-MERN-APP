const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
    name: {
        required: [true, 'Please provide a topic name'],
        minLength: 2,
        maxLength: 20
    },
    createdBy: {
        type: mongoose.Types.ObjectID,
        ref: 'User',
        required: [true, 'Please provide a user']
    }
})

module.exports = mongoose.model('Topic', TopicSchema)