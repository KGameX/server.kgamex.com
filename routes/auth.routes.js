const controller = require('../controllers')
const express = require('express')

const router = express.Router()

router.post('/check', controller.Auth.checkAuth)
router.post('/renew', controller.Auth.renewAuth)
router.post('/login', controller.Auth.login)
router.post('/signup', controller.Auth.signup)
router.post('/logout', controller.Auth.logout)

module.exports = router