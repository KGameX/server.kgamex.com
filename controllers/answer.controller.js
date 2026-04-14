const service = require('../services/answer.service')

async function getAnswers(req, res) {
    try {
        const answers = await service.getAnswers()
        res.json(answers)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function getAnswerByQuestionId(req, res) {
    try {
        const answer = await service.getAnswerByQuestionId(req.params.id)

        if (!answer) {
            return res.status(404).json({ error: 'Answer not found' })
        }

        res.json(answer)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function createAnswer(req, res) {
    try {
        const answerId = await service.createAnswer(req.body)
        res.status(201).json({ id: answerId })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function updateAnswer(req, res) {
    try {
        const answer = await service.updateAnswer(req.params.id, req.body)

        if (!answer) {
            return res.status(404).json({ error: 'Answer not found' })
        }

        res.json(answer)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function deleteAnswer(req, res) {
    try {
        await service.deleteAnswer(req.params.id)
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAnswers,
    getAnswerByQuestionId,
    createAnswer,
    updateAnswer,
    deleteAnswer
}