const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const user = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bio: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull:true
    },
    isAdmin: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = user;