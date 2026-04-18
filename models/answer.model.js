const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const Answer = sequelize.define('answer',
    {
        question_id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
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

module.exports = Answer