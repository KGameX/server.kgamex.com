const service = require('../services')

async function getAnswers(req, res) {
    try {
        const answers = await service.Answer.getAnswers()
        res.json(answers)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function getAnswerByQuestionId(req, res) {
    try {
        const answer = await service.Answer.getAnswerByQuestionId(req.params.id)

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
        const token = req.headers.cookie.split('token=')[1]
        const user = await service.Auth.checkAuth(token)

        if (!user || user.role_id < 3) {
            return res.status(403).json({ error: 'Forbidden' })
        }

        const answerId = await service.Answer.createAnswer(req.body)
        res.status(201).json({ id: answerId })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function updateAnswer(req, res) {
    try {
        const answer = await service.Answer.updateAnswer(req.params.id, req.body)

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
        await service.Answer.deleteAnswer(req.params.id)
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