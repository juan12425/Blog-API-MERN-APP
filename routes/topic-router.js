const express = require('express')
const router = express.Router()
const {createTopic} = require('../controllers/topic-controllers') 

router.route('/').post(createTopic)

module.exports = router