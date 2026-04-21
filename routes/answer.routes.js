const controller = require('../controllers')
const express = require('express')

const router = express.Router()

router.get('/', controller.Answer.getAnswers)
router.get('/:id', controller.Answer.getAnswerByQuestionId)
router.post('/', controller.Answer.createAnswer)

module.exports = router