const controller = require('../controllers/auth.controller')
const express = require('express')

const router = express.Router()

router.post('/check', controller.checkAuth)
router.post('/login', controller.login)
router.post('/signup', controller.signup)

module.exports = router