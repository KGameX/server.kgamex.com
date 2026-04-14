const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const SceneLocale = sequelize.define('SceneLocale',
    {
        scene_id: {
            type: DataTypes.INTEGER,
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

module.exports = SceneLocale