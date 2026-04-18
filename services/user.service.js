const model = require("../models")
const bcrypt = require('bcrypt')
const { generateId } = require('../utils/idgen')

async function getUsers() {
    return await model.User.findAll({ 
        attributes: { exclude: ['password_hash'] }
    })
}

async function getUserById(id) {
    return await model.User.findByPk(id, { 
        attributes: { exclude: ['password_hash'] }
    })
}

async function getUserByUsername(username) {
    return await model.User.findOne({ 
        where: { username: username }, 
        attributes: { exclude: ['password_hash'] } 
    })
}

async function getUserByEmail(email) {
    return await model.User.findOne({ 
        where: { email: email }, 
        attributes: { exclude: ['password_hash'] } 
    })
}

async function createUser(userData) {
    const id = await generateId(10, model.User)
    
    await model.User.create({
        id,
        ...userData
    })

    return id
}

async function updateUser(id, updateData) {
    const user = await model.User.findOne({ where: { id: id } })

    if (!user) {
        throw new Error('User not found')
    }

    return await user.update(updateData)
}

async function updateUserPassword(id, newPasswordHash) {
    const user = await model.User.findOne({ where: { id: id } })

    if (!user) {
        throw new Error('User not found')
    }

    const passwordHistory = await model.PasswordHistory.findAll({ where: { user_id: id } })

    for (const entry of passwordHistory) {
        if (bcrypt.compareSync(newPasswordHash, entry.password_hash)) {
            throw new Error('New password cannot be the same as any of previous passwords')
        }
    }
    
    const t = await model.sequelize.transaction()

    try {
        await model.PasswordHistory.create({
            user_id: id,
            password_hash: newPasswordHash,
            transaction: t
        })
        await user.update({
            password_hash: newPasswordHash,
            transaction: t
        })
        await t.commit()
    } catch (err) {
        await t.rollback()
		throw err
    }
}

async function deleteUser(id) {
    const user = await model.User.findOne({ where: { id: id } })

    if (!user) {
        throw new Error('User not found')
    }

    return await user.destroy()
}

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    createUser,
    updateUser,
    updateUserPassword,
    deleteUser
}