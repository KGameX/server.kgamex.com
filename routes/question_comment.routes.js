const controller = require('../controllers')
const express = require('express')

const router = express.Router()

router.get('/:id', controller.QuestionComment.getCommentsByQuestionId)
router.post('/', controller.QuestionComment.createComment)

module.exports = router