const model = require('../models')

async function getAnswers() {
    return await model.Answer.findAll()
}

async function getAnswerByQuestionId(id) {
    return await model.Answer.findByPk(id, {
        include: [{
            model: model.Question
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