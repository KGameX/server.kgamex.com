const controller = require('../controllers/answer.controller')
const express = require('express')

const router = express.Router()

router.get('/', controller.getAnswers)
router.get('/:id', controller.getAnswerByQuestionId)
router.post('/', controller.createAnswer)

module.exports = router