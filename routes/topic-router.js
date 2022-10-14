const express = require('express')
const router = express.Router()
const {createTopic, getTopics, updateTopic, deleteTopic} = require('../controllers/topic-controllers') 

router.route('/').post(createTopic).get(getTopics).patch(updateTopic)
router.route('/:id').delete(deleteTopic)

module.exports = router