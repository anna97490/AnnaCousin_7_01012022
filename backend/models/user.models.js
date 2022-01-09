const sequelize = require('sequelize');
const db = require('../config/database');
const Post = require('./post.models');
const Comment = require('./comment.models');
const {DataTypes} = sequelize;

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isAdmin: {
        type: DataTypes.BOOLEAN
    }
});

User.hasMany(Post, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade', hooks:'true'});
Post.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade', hooks:'true'});
Comment.belongsTo(User, { foreignKey: 'userId' });

User.sync();
module.exports = User;