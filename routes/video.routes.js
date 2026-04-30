const controller = require('../controllers')
const express = require('express')

const router = express.Router()

router.get('/', controller.Video.getVideos)
router.get('/:id', controller.Video.getVideoById)
router.post('/fetch', controller.Video.getVideosFromYouTubeApi)

module.exports = router