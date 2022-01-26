const sequelize = require('sequelize');
const db = require('../config/database');
const { DataTypes } = sequelize;

const Like = db.define('like', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'user',
      key: 'id',
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'post',
      key: 'id',
    },
  },
  like: {
    type: DataTypes.INTEGER, 
  },
  dislike: {
    type: DataTypes.INTEGER, 
  }
});

Like.sync();
module.exports = Like;