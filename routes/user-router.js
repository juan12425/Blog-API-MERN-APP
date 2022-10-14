const express = require('express')
const router = express.Router()
const { getUser, deleteUser, updateUser } = require('../controllers/user-controllers')

router.route('/:id').get(getUser).patch(updateUser)
router.route('/').delete(deleteUser)

module.exports = router