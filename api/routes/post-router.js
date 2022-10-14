const express = require('express')
const router = express.Router()
const {createPost, getPosts, updatePost, deletePost} = require('../controllers/post-controllers')

router.route('/').post(createPost).get(getPosts)
router.route('/:id').patch(updatePost).delete(deletePost)

module.exports = router