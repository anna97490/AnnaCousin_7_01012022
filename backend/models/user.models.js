const sequelize = require('sequelize');
const db = require('../config/database');
const {DataTypes} = sequelize;

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull:true
    },
    isAdmin: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

User.sync();
module.exports = User