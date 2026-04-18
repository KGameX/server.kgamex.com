const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const Series = sequelize.define('series',
    {
        id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = Series