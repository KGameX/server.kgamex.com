const controller = require('../controllers/user.controller')
const express = require('express')

const router = express.Router()

router.get('/', controller.getUsers)
router.get('/:id', controller.getUserById)
router.get('/username/:username', controller.getUserByUsername)
router.get('/email/:email', controller.getUserByEmail)

module.exports = router