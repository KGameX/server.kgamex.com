const service = require('../services/question.service')

async function getQuestions(req, res) {
    try {
        const questions = await service.getQuestions()
        res.json(questions)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function getQuestionById(req, res) {
    try {
        const question = await service.getQuestionById(req.params.id)

        if (!question) {
            return res.status(404).json({ error: 'Question not found' })
        }

        res.json(question)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function createQuestion(req, res) {
    try {
        const questionId = await service.createQuestion(req.body)
        res.status(201).json({ id: questionId })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function updateQuestion(req, res) {
    try {
        const question = await service.updateQuestion(req.params.id, req.body)

        if (!question) {
            return res.status(404).json({ error: 'Question not found' })
        }

        res.json(question)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function deleteQuestion(req, res) {
    try {
        await service.deleteQuestion(req.params.id)
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
}