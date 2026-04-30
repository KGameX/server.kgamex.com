const service = require('../services')

async function getLocales(req, res) {
    try {
        const locales = await service.Locale.getLocales()
        res.json(locales)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function getLocaleById(req, res) {
    try {
        const locale = await service.Locale.getLocaleById(req.params.id)

        if (!locale) {
            return res.status(404).json({ error: 'Locale not found' })
        }

        res.json(locale)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getLocales,
    getLocaleById
}