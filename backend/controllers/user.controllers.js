const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Inscription
exports.signup = (req, res, next) => {
   User.findOne({ where: { email: req.body.email }})
    .then()
    .catch()
};

// Connexion
exports.login = (req, res, next) => {

};


exports.getOneUser = (req, res, next) => {
  
}

// Modifier le profil
exports.updatePP = (req, res, next) => {
  
} 
    
     