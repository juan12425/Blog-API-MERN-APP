const Topic = require('../models/topic')
const {StatusCodes} = require('http-status-codes')

const createTopic = async (req, res) => {
    const userId = req.user.userId
    const topic = await Topic.create({...req.body, createdBy: userId})
    res.status(StatusCodes.CREATED).json({topic})
}

module.exports = {
    createTopic
}
