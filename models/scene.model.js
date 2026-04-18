const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const Scene = sequelize.define('scene',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        created_at: {
            type: DataTypes.DATE,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = Scene