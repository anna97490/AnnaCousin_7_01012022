const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const comment = require('./comment.models');
const like = require('./like.models');

const post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
});

post.Hasmany(comment,  {onDelete: 'cascade', hooks:'true'});
post.Hasmany(like,  {onDelete: 'cascade', hooks:'true'});

module.exports = post;