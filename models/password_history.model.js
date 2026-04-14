const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const PasswordHistory = sequelize.define('PasswordHistory', 
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