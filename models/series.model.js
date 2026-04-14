const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const Series = sequelize.define('Series',
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