const service = require('../services')

async function getUsers(req, res) {
    try {
        const users = await service.User.getUsers()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function getUserById(req, res) {
    try {
        const user = await service.User.getUserById(req.params.id)

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
        const user = await service.User.getUserByUsername(req.params.username)

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
        const user = await service.User.getUserByEmail(req.params.email)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function updateUser(req, res) {
    try {
        const token = req.headers.cookie.split(';').find(row => row.startsWith('token=')).split('=')[1]
        const user = await service.Auth.checkAuth(token)

        if (!user) {
            return res.status(403).json({ error: 'Forbidden' })
        }

        const updatedUser = await service.User.updateUser(user.id, req.body)
        res.json(updatedUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

async function deleteUser(req, res) {
    try {
        const token = req.headers.cookie.split(';').find(row => row.startsWith('token=')).split('=')[1]
        const user = await service.Auth.checkAuth(token)

        if (!user) {
            return res.status(403).json({ error: 'Forbidden' })
        }

        await service.User.deleteUser(user.id)
        
        res.cookie('token', '', { ...cookieOptions, maxAge: 0 })
        res.status(204).send()
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

async function removeEmail(req, res) {
    try {
        const token = req.headers.cookie.split(';').find(row => row.startsWith('token=')).split('=')[1]
        const user = await service.Auth.checkAuth(token)

        if (!user) {
            return res.status(403).json({ error: 'Forbidden' })
        }

        const updatedUser = await service.User.updateUser(user.id, { email: null })
        res.json(updatedUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    updateUser,
    deleteUser,
    removeEmail
}