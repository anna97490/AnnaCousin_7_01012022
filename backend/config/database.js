const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(, {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;