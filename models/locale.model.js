const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const Locale = sequelize.define('Locale',
    {
        id: {
            type: DataTypes.CHAR(2),
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = Locale