const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const Playlist = sequelize.define('Playlist',
    {
        id: {
            type: DataTypes.CHAR(34),
            primaryKey: true,
        },
        created_at: {
            type: DataTypes.DATE,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = Playlist