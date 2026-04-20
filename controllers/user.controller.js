const service = require('../services/user.service')

async function getUsers(req, res) {
    try {
        const users = await service.getUsers()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function getUserById(req, res) {
    try {
        const user = await service.getUserById(req.params.id)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function getUserByUsername(req, res) {
    try {
        const user = await service.getUserByUsername(req.params.username)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function getUserByEmail(req, res) {
    try {
        const user = await service.getUserByEmail(req.params.email)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail
}