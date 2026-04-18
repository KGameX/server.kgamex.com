const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const SeriesLine = sequelize.define('series_line',
    {
        scene_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        series_id: {
            type: DataTypes.CHAR(10),
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

module.exports = SeriesLine