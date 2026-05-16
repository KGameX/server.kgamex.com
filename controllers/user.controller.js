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

async function updateUser(req, res) {
    try {
        let usernameExists = false
        let emailExists = false

        const token = req.headers.cookie.split(';').find(row => row.trim().startsWith('token=')).split('=')[1]
        const user = await service.Auth.checkAuth(token)

        if (!user) {
            return res.status(403).json({ error: 'Forbidden' })
        }

        if (req.body.username) {
            let userByUsername = await service.User.getUserByUsername(req.body.username)
            if (userByUsername) {
                usernameExists = true
            }
        }

        if (req.body.email) {
            let userByEmail = await service.User.getUserByEmail(req.body.email)
            if (userByEmail) {
                emailExists = true
            }
        }

        if (usernameExists || emailExists) {
            return res.status(409).json({ username_exists: usernameExists, email_exists: emailExists })
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
        const token = req.headers.cookie.split(';').find(row => row.trim().startsWith('token=')).split('=')[1]
        const user = await service.Auth.checkAuth(token)

        if (!user) {
            return res.status(403).json({ error: 'Forbidden' })
        }

        await service.User.deleteUser(user.id)
        
        res.cookie('token', '', { httpOnly: true, maxAge: 0, sameSite: 'none', secure: true })
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
    updateUser,
    deleteUser,
    removeEmail
}