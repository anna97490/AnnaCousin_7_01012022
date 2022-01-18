const sequelize = require('sequelize');
const db = require('../config/database');
//const User = require('./user.models');
//const Post = require('./post.models');
const { DataTypes } = sequelize;

const Comment = db.define('comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'posts',
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

//Post.hasMany(Comment, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade', hooks:'true'});

Comment.sync();
module.exports = Comment;
