const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const SeriesLocale = sequelize.define('series_locale',
    {
        series_id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
        },
        locale_id: {
            type: DataTypes.CHAR(2),
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = SeriesLocale