const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuration pour la connexion à la base de données
const sequelize = new Sequelize(
  'groupomania',
  'root',
  'ReunionIslandDevelopment974!!',
  {
    dialect: 'mysql',
    host: 'localhost',
  }
);

module.exports = sequelize;
