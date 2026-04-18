const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const PlaylistLocale = sequelize.define('playlist_locale',
    {
        playlist_id: {
            type: DataTypes.CHAR(34),
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

module.exports = PlaylistLocale