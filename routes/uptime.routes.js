const controller = require('../controllers')
const express = require('express')

const router = express.Router()

router.get('/', controller.Uptime.getUptime)
router.get('/day', controller.Uptime.getDayOfLaunch)

module.exports = router