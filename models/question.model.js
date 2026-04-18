const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const Question = sequelize.define('question',
    {
        id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.CHAR(10),
        },
        created_at: {
            type: DataTypes.DATE,
        },
        body: {
            type: DataTypes.TEXT,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = Question