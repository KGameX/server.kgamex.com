const service = require('../services')

async function getCommentsByQuestionId(req, res) {
    try {
        const data = await service.QuestionComment.getCommentsByQuestionId(req.params.id, parseInt(req.query.page), parseInt(req.query.itemsPerPage))
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function createComment(req, res) {
    try {
        console.log(req.body)
        const token = req.headers.cookie.split(';').find(row => row.startsWith('token=')).split('=')[1]
        const user = await service.Auth.checkAuth(token)

        if (!user) {
            return res.status(403).json({ error: 'Forbidden' })
        }
        
        const comment = await service.QuestionComment.createComment({
            user_id: user.id, 
            ...req.body
        })

        res.status(201).json({
            ...comment.dataValues,
            user: {
                id: user.id,
                username: user.username,
                display_name: user.display_name
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.error('Failed to create comment : ', error)
    }
}

module.exports = {
    getCommentsByQuestionId,
    createComment
}