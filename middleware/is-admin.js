const {UnauthorizedError} = require('../errors/')

const isAdmin = async (req, res, next) => {
    
    if(req.user.role != 'admin')
    {
        throw new UnauthorizedError('User not authorize to access resources')
    }

    next()
}

module.exports = isAdmin