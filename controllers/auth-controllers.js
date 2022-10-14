const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const {NotFoundError, UnauthorizedError, BadRequestError} = require('../errors')

const register = async (req, res) => {

    if(req.body.role)
    {
        throw new UnauthorizedError('Not authorized to assaign roles')
    }

    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name: user.name}, token, role: user.role})
    
}

const login = async (req, res) => {
    
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(!password || !email)
    {
        throw new BadRequestError('Please provide a password and an email')
    }

    if(!user)
    {
        throw new NotFoundError('User could not be found')
    }
    
    if(!user.compare(password))
    {
        throw new UnauthorizedError('Not authorized')
    }


    res.send('User logged successfully')
}

module.exports = {
    register,
    login
}