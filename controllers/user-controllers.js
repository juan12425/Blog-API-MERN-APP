const user = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, UnauthorizedError, BadRequestError} = require('../errors')

const getAllUsers = async (req, res) => {


    if(req.user.role != 'admin')
    {
        throw new UnauthorizedError('User not authorize to access resources')
    }

    res.status(StatusCodes.CREATED).send('Users displayed for admin')
}

module.exports = {
    getAllUsers
}