const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

// Inscription
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const newUser = ({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      password: hash,
      isAdmin: req.body.isAdmin // 0?
      })
      User.create(newUser)
      .then(() => res.status(201).json({ message: 'User created!' }))
      .catch((error) => res.status(400).json({ error: 'Email already used!' }));
    }) 
    .catch((error) => res.status(500).json({ error }))  
    console.log(req.body);       
};

// Connexion
exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email} })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'User not found!' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Invalid Password!' });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, {
              expiresIn: '24h'
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};


exports.getOneUser = (req, res, next) => {
  const id = req.params;
  User.findOne({ where: {id: req.params.id} })
  .then((user) => {
    if (!user) return res.status(404).json({ message: 'User not found'});
    res.status(200).json(user);
  })
  .catch((error) => res.status(500).json({ error }));
};


// Modifier le profil
exports.updateUser = (req, res, next) => {
  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  User.updateOne(
    { id: req.params.id },
    { ...userObject, id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'User updated successfully!' }))
    .catch((error) => res.status(400).json({ error }));
};

// Déconnexion

// Suppression du profil
exports.deleteUser = (req, res, next) => {
  User.findOne({ where: {id: req.params.id} })
  .then((user) => {
    const filename = user.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      User.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'Deleted !' }))
        .catch((error) => res.status(400).json({ error }));
    });
  })
  .catch((error) => res.status(500).json({ error }));
};
