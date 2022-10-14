const user = require('../models/user')
const {NotFoundError, UnauthorizedError, BadRequestError} = require('../errors')

const getUser = async (req, res) => {

    if(user.role != 'admin')
    {
        throw new UnauthorizedError('User not authorize to access resources')
    }


}