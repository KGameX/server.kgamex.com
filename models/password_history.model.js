const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const PasswordHistory = sequelize.define('password_history', 
    {
        user_id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
        },
        password_hash: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = PasswordHistory