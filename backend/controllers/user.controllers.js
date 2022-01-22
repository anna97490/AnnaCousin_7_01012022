const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();
//ok

// Inscription
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        isAdmin: req.body.isAdmin || 0, // 0?
      };
      User.create(user)
        .then(() => res.status(201).json({ message: 'User created!' }))
        .catch((error) =>
          res.status(400).json({ error: 'Email already used!' })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};

// Connexion
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
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
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user.id, isAdmin: user.isAdmin },
              process.env.SECRET_TOKEN,
              {
                expiresIn: '24h',
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error: 'no work' }));
    })
    .catch((error) => res.status(500).json({ error: req.body.id }));
};

exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (!user) return res.status(404).json({ error: 'User not found!' });
      res.status(200).json({
        userId: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        isAdmin: user.isAdmin,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt,
      });
    })
    .catch((error) => res.status(404).json({ error }));
};

// Modifier le profil
exports.updateUser = (req, res, next) => {
  const userObject = req.file
    ? {
        ...JSON.parse(req.body),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      User.update({ ...userObject }, { where: { id: req.params.id } })
        .then(() =>
          res.status(200).json({ message: 'Profil successfully updated !' })
        )
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Suppression du profil
exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      console.log(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      } else {
        User.destroy({ where: { id: req.params.id } })
          .then(() => {
            return res
              .status(200)
              .json({ message: 'Profil successfully deleted!' });
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
