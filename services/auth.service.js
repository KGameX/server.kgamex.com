const jwt = require('jsonwebtoken')
const model = require('../models')
const userService = require('./user.service')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

async function checkAuth(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await model.User.findByPk(decoded.id, {
            attributes: { exclude: ['password_hash'] }
        })

        if (!user) {
            throw new Error('User not found')
        }

        return user
    } catch (err) {
        throw new Error('Invalid token')
    }
}

async function renewAuth(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await model.User.findByPk(decoded.id, {
            attributes: { exclude: ['password_hash'] }
        })

        if (!user) {
            throw new Error('User not found')
        }

        const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' })

        return { user, newToken }
    } catch (err) {
        throw new Error('Invalid token')
    }
}

async function login(login, password) {
    const user = await model.User.findOne({
        where: {
            [Op.or]: [
                { username: login },
                { email: login }
            ]
        }
    })

    if (!user) {
        throw new Error('User not found')
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash)

    if (!passwordMatch) {
        throw new Error('Invalid password')
    }
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' })

    return { user, token }
}

async function signup(username, email, displayName, password) {
    const passwordHash = await bcrypt.hash(password, 10)

    const user = await userService.createUser({
        username: username,
        email: email,
        display_name: displayName,
        password_hash: passwordHash
    })

    user.password_hash = undefined

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' })

    return { user, token }
}

module.exports = {
    checkAuth,
    renewAuth,
    login,
    signup
}