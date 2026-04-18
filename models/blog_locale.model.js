const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const BlogLocale = sequelize.define('blog_locale',
    {
        article_id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
        },
        locale_id: {
            type: DataTypes.CHAR(2),
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        body: {
            type: DataTypes.TEXT,
        }
    },
    {
        timestamps: false,
    }
)

module.exports = BlogLocale