const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('groupomania', 'root', 'ReunionIslandDevelopment974!!', {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;