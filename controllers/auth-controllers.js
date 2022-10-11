
const register = (req, res) => {
    res.status(200).send('Register user')
}

const login = (req, res) => {
    res.status(200).send('Login User')
}

module.exports = {
    register,
    login
}