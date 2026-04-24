const model = require('../models')
const { generateId } = require('../utils/idgen')

async function getQuestions() {
    return await model.Question.findAll({
        order: [['created_at', 'DESC']],
        attributes: { exclude: ['user_id'] },
        include: [{
            model: model.User,
            attributes: { exclude: ['email', 'password_hash'] },
            required: false
        },
    
        {
            model: model.Answer,
            required: false,
            attributes: { exclude: ['question_id'] }
        }]
    })
}

async function getQuestionById(id) {
    return await model.Question.findByPk(id, {
        attributes: { exclude: ['user_id'] },
        include: [{
            model: model.User,
            attributes: { exclude: ['email', 'password_hash'] },
            required: false
        },
    
        {
            model: model.Answer,
            required: false,
            attributes: { exclude: ['question_id'] }
        }]
    })
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
    const answer = await model.Answer.findOne({ where: { question_id: id } })

    if (answer) {
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