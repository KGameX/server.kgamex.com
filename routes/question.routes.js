const controller = require('../controllers')
const express = require('express')

const router = express.Router()

router.get('/', controller.Question.getQuestions)
router.get('/:id', controller.Question.getQuestionById)
router.post('/', controller.Question.createQuestion)

module.exports = router