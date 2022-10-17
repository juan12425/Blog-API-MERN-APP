const Topic = require('../models/topic')
const Post = require('../models/post')
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
    
    const topic = await Topic.findOneAndUpdate(filterObject, {name}, {new:true, runValidators:true})
   
    if(!topic)
    {
        throw new BadRequestError('Sorry, there was an error trying to update the requested topic')
    }

    res.status(StatusCodes.OK).json({msg: "topic name was updated"})

}

const deleteTopic = async (req,res) => {
    
    const {role} = req.user.userId
    
    const topic = await Topic.findOne({_id: req.params.id})
    
    if(!topic)
    {
        throw new BadRequestError('Sorry, the topic was not found')
    }

    if(role == 'client' || (role == 'client' && topic.createdBy != req.user.userId))
    {
        throw new BadRequestError('Sorry, you must be an admin or moderator to delete topics of other users')
    }
    
    await Topic.findOneAndRemove({_id: req.params.id})
    

    await Post.deleteMany({relatedTopic: req.params.id})

    res.status(StatusCodes.OK).json({msg: 'Topic and related posts were successfully deleted'})
}

module.exports = {
    createTopic,
    getTopics,
    updateTopic,
    deleteTopic
}
