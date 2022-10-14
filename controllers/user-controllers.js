const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, UnauthorizedError, BadRequestError} = require('../errors')

const getUser = async (req, res) => {
    
    const userId = req.params.id
    const user = await User.findOne({_id:userId})
    const {id, role, email} = user 
    res.status(StatusCodes.CREATED).send({id, role, email})
}

module.exports = {
    getUser
}