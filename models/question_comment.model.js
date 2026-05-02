const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const QuestionComment = sequelize.define('question_comment',
    {
        id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.CHAR(10),
            allowNull: false,
        },
        question_id: {
            type: DataTypes.CHAR(10),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
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

module.exports = QuestionComment