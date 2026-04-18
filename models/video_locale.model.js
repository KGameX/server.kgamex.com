const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const VideoLocale = sequelize.define('video_locale',
    {
        video_id: {
            type: DataTypes.CHAR(11),
            primaryKey: true,
        },
        locale_id: {
            type: DataTypes.CHAR(2),
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(150),
        },
        description: {
            type: DataTypes.STRING(5000),
        }
    },
    {
        timestamps: false,
    }
)

module.exports = VideoLocale