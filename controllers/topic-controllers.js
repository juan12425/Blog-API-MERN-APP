const Topic = require('../models/topic')
//const Post = require('../models/post')
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

const getTopics = async (req, res) => {
    const {id, name} = req.query
    const queryObject = {}
   
    if(id)
    {
        queryObject._id = id
    }

    if(name)
    {
        queryObject.name = name
    }

    const topics = await Topic.find(queryObject)
    
    if(!topics)
    {
        throw new BadRequestError('Sorry, there was an error trying to obtain the topics')
    }

    res.status(StatusCodes.OK).json({topics})
}  

const updateTopic = async (req, res) => {
    const {name, id} = req.body
    const {userId, role} = req.user
    const filterObject = {}
    
    filterObject._id = id
    
    if(role == 'client')
    {
        filterObject.createdBy = userId
    }
    
    const topic = await Topic.findOneAndUpdate(filterObject, {name})
   
    if(!topic)
    {
        throw new BadRequestError('Sorry, there was an error trying to update the requested topic')
    }

    res.status(StatusCodes.OK).json({msg: "topic name was updated"})

}

module.exports = {
    createTopic,
    getTopics,
    updateTopic
}
