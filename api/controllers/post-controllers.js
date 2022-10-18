const Post = require('../models/post')
const {BadRequestError} = require('../errors')
const {StatusCodes} = require('http-status-codes')

const createPost = async (req, res) => {
    const {userId} = req.user
    const post = await Post.create({...req.body, createdBy: userId})
    if(!post)
    {
        throw new BadRequestError('Sorry, there was an error while creating the post')
    }
    res.status(StatusCodes.CREATED).json({post})

}

const getPosts = async (req, res) => {
    const {name, createdBy, relatedTopic} = req.query
    const queryObject = {}

    if(name)
    {
        queryObject.name = name
    }

    if(createdBy)
    {
        queryObject.createdBy = createdBy
    }

    if(relatedTopic)
    {
        queryObject.relatedTopic = relatedTopic
    }

    const posts = await Post.find(queryObject)

    if(!posts)
    {
        throw new BadRequestError('Sorry, no posts were found')
    }

    res.status(StatusCodes.OK).json({posts})
}

const updatePost = async (req, res) => {

    const {role, userId} = req.user
    const id = req.params.id
    const filterObject = {}
    filterObject._id = id
    
    if(role == 'client')
    {
        filterObject.createdBy = userId
    }

    const post = await Post.findOneAndUpdate(filterObject, req.body, {new:true, runValidators:true})

    if(!post)
    {
        throw new BadRequestError('Sorry, we could not find the post requested')
    }

    res.status(StatusCodes.OK).json({msg: 'Update was successful'})

}

const deletePost = async (req, res) => {

    const {role, userId} = req.user
    const id = req.params.id
    const filterObject = {}
    filterObject._id = id
    
    if(role == 'client')
    {
        filterObject.createdBy = userId
    }

    const post = await Post.findOneAndDelete(filterObject)

    if(!post)
    {
        throw new BadRequestError('Sorry, we could not find the post requested')
    }

    res.status(StatusCodes.OK).json({msg: 'Post deleted successfully'})

}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost
} 