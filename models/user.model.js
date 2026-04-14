const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const User = sequelize.define('User', 
    {
        id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        display_name: {
            type: DataTypes.STRING,
        },
        password_hash: {
            type: DataTypes.STRING,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = User