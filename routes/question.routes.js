const controller = require('../controllers/question.controller')
const express = require('express')

const router = express.Router()

router.get('/', controller.getQuestions)
router.get('/:id', controller.getQuestionById)
router.post('/', controller.createQuestion)

module.exports = router