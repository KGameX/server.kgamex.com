const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const BlogStatus = sequelize.define('blog_status',
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

module.exports = BlogStatus