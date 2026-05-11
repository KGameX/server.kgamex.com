const controller = require('../controllers')
const express = require('express')

const router = express.Router()

router.get('/', controller.User.getUsers)
router.get('/:id', controller.User.getUserById)
router.put('/', controller.User.updateUser)
router.delete('/', controller.User.deleteUser)
router.delete('/email', controller.User.removeEmail)

module.exports = router