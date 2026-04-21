const service = require('../services')

const cookieOptions = {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'none',
    secure: true
}

async function checkAuth(req, res) {
    try {
        const token = req.headers.cookie.split('token=')[1]
        const user = await service.Auth.checkAuth(token)
        res.json(user)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

async function renewAuth(req, res) {
    try {
        const token = req.headers.cookie.split('token=')[1]
        const { user, newToken } = await service.Auth.renewAuth(token)
        res.cookie('token', newToken, cookieOptions)
        res.json(user)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

async function login(req, res) {
    try {
        const { user, token } = await service.Auth.login(req.body.login, req.body.password)
        res.cookie('token', token, cookieOptions)
        res.json(user)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

async function signup(req, res) {
    try {
        const { user, token } = await service.Auth.signup(req.body.username, req.body.email, req.body.displayName, req.body.password)
        res.cookie('token', token, cookieOptions)
        res.json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function logout(req, res) {
    res.cookie('token', '', { ...cookieOptions, maxAge: 0 })
    res.json({ message: 'Logged out successfully' })
}

module.exports = {
    checkAuth,
    renewAuth,
    login,
    signup,
    logout
}