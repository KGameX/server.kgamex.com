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
        isShort: {
            type: DataTypes.BOOLEAN
        },
        created_at: {
            type: DataTypes.DATE,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = Video