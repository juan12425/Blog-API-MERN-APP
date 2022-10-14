const user = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, UnauthorizedError, BadRequestError} = require('../errors')

const getUser = async (req, res) => {

    res.status(StatusCodes.CREATED).send('Users displayed for admin')
}

module.exports = {
    getUser
}