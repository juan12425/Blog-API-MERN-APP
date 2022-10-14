const express = require('express')
const router = express.Router()
const { getUser } = require('../controllers/user-controllers')

router.route('/:id').get(getUser)

module.exports = router