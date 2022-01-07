const sequelize = require('sequelize');
const db = require('../config/database');
const Comment = require('./comment.models');
const {DataTypes} = sequelize;

const Post = db.define('post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull:true
    }
});


Post.hasMany(Comment,  {onDelete: 'cascade', hooks:'true'});

Post.sync();
module.exports = Post;