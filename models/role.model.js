const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const Role = sequelize.define('role',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = Role