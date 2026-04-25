const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const Video = sequelize.define('video',
    {
        id: {
            type: DataTypes.CHAR(11),
            primaryKey: true,
        },
        duration: {
            type: DataTypes.INTEGER
        },
        thumbnail_url: {
            type: DataTypes.STRING
        },
        is_short: {
            type: DataTypes.BOOLEAN
        },
        published_at: {
            type: DataTypes.DATE,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = Video