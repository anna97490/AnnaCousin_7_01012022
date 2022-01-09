const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();
//ok

// Inscription
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // POUR LE MOMENT PAS POSSSIBLE
      imageUrl: req.body.imageUrl,
      password: hash,
      isAdmin: req.body.isAdmin || 0// 0?
      }
      User.create(user)
      .then(() => res.status(201).json({ message: 'User created!' }))
      .catch((error) => res.status(400).json({ error: 'Email already used!' }));
    }) 
    .catch((error) => res.status(500).json({ error }))       
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
        .catch((error) => res.status(500).json({ error: "no work"  }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Modifier le profil
exports.updateUser = (req, res, next) => {
  const userObject = req.file ? {
    ...JSON.parse(req.body),
    imageUrl: req.body.imageUrl
    //imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  } : { ...req.body}
  User.findByPk(req.params.id) // OU const id = req.params.id
  .then(user => {
    if (!user){
      return res.status(404).json({ message: 'User not found!' });
    } 
    User.update({...userObject}, { where: { id: req.params.id }})
      .then(() => res.status(200).json({message: 'Profil successfully updated !'}))
      .catch((error) => res.status(500).json({ error }));
  })
  .catch(error => { res.status(500).json({ error });
  })
};

// Suppression du profil
exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id }})
  .then((user) => {
    console.log(req.params.id)
      if (!user) {
        return res.status(404).json({ message: 'User not found!' })
      } else {
        //const filename = sauce.imageUrl.split('/images/')[1];
        //fs.unlink({where: { id: req.params.id}}/*`images/${filename}`*/, () => {
          User.destroy({ where: { id: req.params.id }})
          .then(() => {
            return res.status(200).json({message: 'Profil successfully deleted!'});  
            })
          .catch((error) => res.status(500).json({ error }));
        //});
      }
  })    
  .catch(error => { res.status(500).json({ error });
  })  
};
