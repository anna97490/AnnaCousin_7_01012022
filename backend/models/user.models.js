const sequelize = require('sequelize');
const db = require('../config/database');
const Post = require('./post.models');
const { DataTypes } = sequelize;

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
  },
}, {
  freezeTableName: true
});

// Lien avec la table posts
// En cas de suppression du user, ses posts le seront aussi 
User.hasMany(Post, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: 'true',
  foreignKey: 'userId'
});
Post.belongsTo(User, {foreignKey: 'userId'})
User.sync();
module.exports = User;
