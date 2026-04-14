const ID_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'

async function generateId(length = 10, model) {
    let result
    do {
        result = ''
        for (let i = 0; i < length; i++) {
            result += ID_CHARS.charAt(Math.floor(Math.random() * ID_CHARS.length))
        }
    } while (await model.findByPk(result))
    return result
}

module.exports = {
    generateId
}