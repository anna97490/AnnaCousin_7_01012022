const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const like = sequelize.define('like', {
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
});

like.associations = (models) => {
    like.belongsTo(models.post);
}

module.exports = like;