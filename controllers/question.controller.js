const service = require('../services')

async function getQuestions(req, res) {
    try {
        const data = await service.Question.getQuestions(parseInt(req.query.page), parseInt(req.query.itemsPerPage))
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function getQuestionById(req, res) {
    try {
        const question = await service.Question.getQuestionById(req.params.id)

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
        const questionBody = req.body.split('\n').map(line => line.trim()).filter(line => line.length > 0).join('\n')
        const questionId = await service.Question.createQuestion(req.body)
        res.status(201).json({ id: questionId })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function updateQuestion(req, res) {
    try {
        const question = await service.Question.updateQuestion(req.params.id, req.body)

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
        await service.Question.deleteQuestion(req.params.id)
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