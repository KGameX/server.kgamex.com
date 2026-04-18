const jwt = require('jsonwebtoken')
const model = require("../models")
const bcrypt = require('bcrypt')

async function authenticate(login, password) {
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
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1m' })

    return token
}

module.exports = {
    authenticate
}