const model = require("../models")

async function getVideos(page, itemsPerPage, isShort) {
    if (!page) page = 1
    if (!itemsPerPage) itemsPerPage = 50
    if (!isShort) isShort = false

    const metadata = {
        items_per_page: itemsPerPage,
        page: page,
        total: await model.Video.count({ where: { is_short: isShort } })
    }

    const videos = await model.Video.findAll({
        order: [['published_at', 'DESC']],
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage,
        where: { is_short: isShort },
        include: {
            model: model.VideoLocale,
            attributes: {
                exclude: ['video_id']
            }
        }
    })

    return { metadata, videos }
}

async function getVideoById(id) {
    return await model.Video.findByPk(id, {
        include: {
            model: model.VideoLocale,
            attributes: {
                exclude: ['video_id']
            }
        }
    })
}

async function getVideosFromYouTubeApi() {
    const videos = await model.Video.findAll({
        attributes: ['id']
    })

    let nextPageToken, response, data
    let fetchedVideoIds = []
    while (true) {
        if (nextPageToken) {
            response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${process.env.YOUTUBE_CHANNEL_ID}&pageToken=${nextPageToken}&key=${process.env.YOUTUBE_API_KEY}`)
        } else {
            response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${process.env.YOUTUBE_CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}`)
        }

        data = await response.json()

        for (const item of data.items) {
            fetchedVideoIds.push(item.snippet.resourceId.videoId)
        }

        if (data.nextPageToken) {
            nextPageToken = data.nextPageToken
        } else {
            break
        }
    }

    const newVideoIds = fetchedVideoIds.filter(id => !videos.some(video => video.id === id))

    const locales = await model.Locale.findAll({
        attributes: ['id']
    })

    for (const id of newVideoIds) {
        response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${id}&key=${process.env.YOUTUBE_API_KEY}`)

        data = await response.json()

        await model.Video.create({
            id: id,
            duration: parseDuration(data.items[0].contentDetails.duration),
            thumbnail_url: data.items[0].snippet.thumbnails.maxres.url,
            is_short: data.items[0].snippet.description.includes('#shorts'),
            published_at: data.items[0].snippet.publishedAt
        })
    }

    for (const localeId of locales.map(locale => locale.id)) {
        for (const id of newVideoIds) {
            response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${id}&hl=${localeId}&key=${process.env.YOUTUBE_API_KEY}`)

            data = await response.json()

            await model.VideoLocale.create({
                video_id: id,
                locale_id: localeId,
                name: data.items[0].snippet.localized.title,
                description: data.items[0].snippet.localized.description
            })
        }
    }
}

function parseDuration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    const hours = parseInt(match[1] || '0')
    const minutes = parseInt(match[2] || '0')
    const seconds = parseInt(match[3] || '0')
    return hours * 3600 + minutes * 60 + seconds
}

module.exports = {
    getVideos,
    getVideoById,
    getVideosFromYouTubeApi
}