const Topic = require('../models/topic')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')

const createTopic = async (req, res) => {
    const userId = req.user.userId
    const topic = await Topic.create({...req.body, createdBy: userId})

    if(!topic)
    {
        throw new BadRequestError('Topic was not created, please try again later')
    }

    res.status(StatusCodes.CREATED).json({topic})
}

module.exports = {
    createTopic
}
