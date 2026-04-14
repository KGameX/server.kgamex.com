const controller = require('../controllers/user.controller')
const express = require('express')

const router = express.Router()

router.get('/', controller.getUsers)
router.get('/:id', controller.getUserById)

module.exports = router