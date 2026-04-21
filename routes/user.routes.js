const controller = require('../controllers')
const express = require('express')

const router = express.Router()

router.get('/', controller.User.getUsers)
router.get('/:id', controller.User.getUserById)
router.get('/username/:username', controller.User.getUserByUsername)
router.get('/email/:email', controller.User.getUserByEmail)

module.exports = router