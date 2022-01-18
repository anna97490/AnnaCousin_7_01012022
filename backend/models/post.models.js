const sequelize = require('sequelize');
const db = require('../config/database');
const Comment = require('./comment.models');
const { DataTypes } = sequelize;

const Post = db.define('post', {
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
  authorFullName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
});

Post.hasMany(Comment, {
  /*foreignKey: 'postId',*/ onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: 'true',
});
//Comment.belongsTo(Post, { foreignKey: 'postId' });

Post.sync();
module.exports = Post;
