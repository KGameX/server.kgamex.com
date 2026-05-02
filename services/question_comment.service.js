const model = require('../models')
const { generateId } = require('../utils/idgen')

async function getCommentsByQuestionId(questionId, page, itemsPerPage) {
    if (!page) page = 1
    if (!itemsPerPage) itemsPerPage = 50

    const metadata = {
        items_per_page: itemsPerPage,
        page: page,
        total: await model.QuestionComment.count({ where: { question_id: questionId } })
    }

    const comments = await model.QuestionComment.findAll({
        where: { question_id: questionId },
        order: [['created_at', 'DESC']],
        attributes: { exclude: ['user_id', 'question_id'] },
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage,
        include: [{
            model: model.User,
            attributes: ['id', 'username', 'display_name'],
            required: false
        }]
    })

    return { metadata, comments }
}

async function createComment(commentData) {
    const id = await generateId(10, model.QuestionComment)
    const date = Date.now()
    
    const comment = await model.QuestionComment.create({
        id: id,
        created_at: date,
        ...commentData
    })

    return comment
}

module.exports = {
    getCommentsByQuestionId,
    createComment
}