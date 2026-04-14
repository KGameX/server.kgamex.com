const model = require('../models')
const { generateId } = require('../utils/idgen')

async function getQuestions() {
    return await model.Question.findAll({
        order: [['created_at', 'DESC']]
    })
}

async function getQuestionById(id) {
    return await model.Question.findByPk(id)
}

async function createQuestion(questionData) {
	const id = await generateId(10, model.Question)
    const date = Date.now()
    
    const question = await model.Question.create({
        id: id,
        created_at: date,
        ...questionData
    })

    return question.id
}

async function updateQuestion(id, updateData) {
    const question = await model.Question.findByPk(id)

    if (!question) {
        throw new Error('Question not found')
    }

    return await question.update(updateData)
}

async function deleteQuestion(id) {
    const answers = await model.Answer.findAll({ where: { question_id: id } })

    for (const answer of answers) {
        await answer.destroy()
    }

    const question = await model.Question.findByPk(id)

    if (!question) {
        throw new Error('Question not found')
    }

    return await question.destroy()
}

module.exports = {
    getQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
}