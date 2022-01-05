const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    text:{
        type:DataTypes.TEXT,
        allowNull:false
    }
});

comment.associations = (models) => {
    comment.belongsTo(models.post)
}

module.exports = comment;