const express = require('express')
const router = express.Router()
const {createTopic, getTopics, updateTopic} = require('../controllers/topic-controllers') 

router.route('/').post(createTopic).get(getTopics).patch(updateTopic)

module.exports = router