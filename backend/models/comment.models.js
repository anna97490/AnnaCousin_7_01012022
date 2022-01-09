const sequelize = require('sequelize');
const db = require('../config/database');
//const User = require('./user.models');
//const Post = require('./post.models');
const {DataTypes} = sequelize;

const Comment = db.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    text: {
        type:DataTypes.TEXT,
        allowNull: false
    }
});

Comment.sync();
module.exports = Comment;