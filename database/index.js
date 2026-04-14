const Sequelize = require('sequelize')
require('dotenv').config()

console.log(".env " + process.env.DB_PASSWORD)

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        define: {
            freezeTableName: true,
        }
    }
)   

module.exports = sequelize