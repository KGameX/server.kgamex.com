const dayOfLaunch = new Date().getDay()

async function getUptime(req, res) {
    try {
        const uptime = process.uptime()
        res.json({ uptime })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function getDayOfLaunch(req, res) {
    try {
        res.json({ day_of_launch: dayOfLaunch })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getUptime,
    getDayOfLaunch
}