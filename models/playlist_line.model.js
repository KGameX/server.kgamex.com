const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const PlaylistLine = sequelize.define('PlaylistLine',
    {
        video_id: {
            type: DataTypes.CHAR(11),
            primaryKey: true,
        },
        playlist_id: {
            type: DataTypes.CHAR(34),
            primaryKey: true,
        },
        position: {
            type: DataTypes.INTEGER,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = PlaylistLine