const service = require('../services/auth.service')

const cookieOptions = {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'none',
    secure: true
}

async function checkAuth(req, res) {
    try {
        const token = req.headers.cookie.split('token=')[1]
        const { user, newToken } = await service.checkAuth(token)
        res.cookie('token', newToken, cookieOptions)
        res.json(user)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

async function login(req, res) {
    try {
        const { user, token } = await service.login(req.body.login, req.body.password)
        res.cookie('token', token, cookieOptions)
        res.json(user)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

async function signup(req, res) {
    try {
        const { user, token } = await service.signup(req.body.username, req.body.email, req.body.displayName, req.body.password)
        res.cookie('token', token, cookieOptions)
        res.json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    checkAuth,
    login,
    signup
}