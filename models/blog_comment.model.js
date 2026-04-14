const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const BlogComment = sequelize.define('BlogComment',
    {
        id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.CHAR(10),
            allowNull: false,
        },
        article_id: {
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

module.exports = BlogComment