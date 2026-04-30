const controller = require('../controllers')
const express = require('express')

const router = express.Router()

router.get('/', controller.Locale.getLocales)
router.get('/:id', controller.Locale.getLocaleById)

module.exports = router