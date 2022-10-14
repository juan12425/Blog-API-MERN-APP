const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, UnauthorizedError, BadRequestError} = require('../errors')

const getUser = async (req, res) => {
    const userId = req.params.id
    const user = await User.findOne({_id:userId})
    const {id, role, email} = user 
    res.status(StatusCodes.OK).json({id, role, email})
}

const deleteUser = async (req, res) => {
    const {email} = req.body
    const user = await User.findOneAndRemove({email: email})
    console.log(user)
    
    if(!user)
    {
        throw new BadRequestError(`Could not find user with email ${email}`)
    }

    res.status(StatusCodes.OK).json({msg: `User with email ${user.email} successfully deleted`})
}

const updateUser = async (req, res) => {
    const userId = req.params.id
    const user = await User.findOneAndUpdate({_id: userId}, {...req.body})

    if(!user)
    {
        throw new BadRequestError(`Could not find user with id ${userId}`)
    }

    const {id, role, email} = user 
    res.status(StatusCodes.OK).json({id, role, email})
}

module.exports = {
    getUser,
    deleteUser,
    updateUser
}