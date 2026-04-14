const model = require("../models")

async function getVideos() {
    return await model.Video.findAll()
}

async function getVideoById(id) {
    return await model.Video.findByPk(id)
}

async function addVideo(videoData) {
    return await model.Video.create(videoData)
}