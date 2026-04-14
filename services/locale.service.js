const model = require('../models')

async function getLocales() {
    return await model.Locale.findAll()
}

async function getLocaleById(id) {
	return await model.Locale.findByPk(id)
}

async function createLocale(localeData) {
    const locale = await model.Locale.create(localeData)
    return locale.id
}

async function updateLocale(id, updateData) {
    const locale = await model.Locale.findByPk(id)

    if (!locale) {
        throw new Error('Locale not found')
    }

    return await locale.update(updateData)
}

module.exports = {
    getLocales,
    getLocaleById,
    createLocale,
    updateLocale
}