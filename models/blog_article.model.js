const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const BlogArticle = sequelize.define('blog_article',
    {
        id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        published_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = BlogArticle