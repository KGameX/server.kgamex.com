const model = require('../models')

async function getAnswers() {
    return await model.Answer.findAll({
		order: [['created_at', 'DESC']],
        attributes: { exclude: ['question_id'] },
        include: [{
            model: model.Question,
            attributes: { exclude: ['user_id'] },
            include: [{
                model: model.User,
                attributes: ['id', 'username', 'display_name'],
                required: false
            }]
        }]
    })
}

async function getAnswerByQuestionId(id) {
    return await model.Answer.findByPk(id, {
        attributes: { exclude: ['question_id'] },
        include: [{
            model: model.Question,
            attributes: { exclude: ['user_id'] },
            include: [{
                model: model.User,
                attributes: ['id', 'username', 'display_name'],
                required: false
            }]
        }]
    })
}

async function createAnswer(answerData) {
    const date = Date.now()

    const question = await model.Question.findByPk(answerData.question_id)

    if (!question) {
        throw new Error('Question not found')
    }

    const answer = await model.Answer.create({
        created_at: date,
        ...answerData
    })

    return answer.question_id
}

async function updateAnswer(id, updateData) {
    const answer = await model.Answer.findOne({ where: { question_id: id } })

    if (!answer) {
        throw new Error('Answer not found')
    }

    return await answer.update(updateData)
}

async function deleteAnswer(id) {
    const answer = await model.Answer.findOne({ where: { question_id: id } })

    if (!answer) {
        throw new Error('Answer not found')
    }

    return await answer.destroy()
}

module.exports = {
    getAnswers,
    getAnswerByQuestionId,
    createAnswer,
    updateAnswer,
    deleteAnswer
}