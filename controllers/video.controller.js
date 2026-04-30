const service = require('../services')

async function getVideos(req, res) {
    try {
        const data = await service.Video.getVideos(parseInt(req.query.page), parseInt(req.query.itemsPerPage), req.query.isShort === 'true')
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function getVideoById(req, res) {
    try {
        const video = await service.Video.getVideoById(req.params.id)

        if (!video) {
            return res.status(404).json({ error: 'Video not found' })
        }

        res.json(video)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function getVideosFromYouTubeApi(req, res) {
    try {
        service.Video.getVideosFromYouTubeApi()
        res.status(200).json({ message: 'Videos are being fetched from YouTube API' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

setInterval(async () => {
    try {
        const token = req.headers.cookie.split(';').find(row => row.startsWith('token=')).split('=')[1]
        const user = await service.Auth.checkAuth(token)

        if (!user || user.role_id < 3) {
            return res.status(403).json({ error: 'Forbidden' })
        }

        await service.Video.getVideosFromYouTubeApi()
    } catch (error) {
        console.error('Failed to fetch videos from YouTube API : ', error)
    }
}, 604800000)

module.exports = {
    getVideos,
    getVideoById,
    getVideosFromYouTubeApi
}