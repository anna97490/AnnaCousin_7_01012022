const db = require('../config/database');
const  bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

// Inscription
exports.signup = (req, res, next) => {
    const sql = `SELECT * FROM user WHERE email=?`;
    db.query(sql, [req.body.email], function (err, result) {
        const user = result[0];
        if(!user) {
            bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                const user = {
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    password: hash,
                    imageUrl: image
                }
                const sql = `INSERT INTO user (nom, prenom, email, password, imageurl) VALUES (?,?,?,?,?)`;
                db.query(sql, [user.nom, user.prenom, user.email, user.password, user.imageUrl], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ message: 'User created!' });
                })
            })
            .catch(error => res.status(500).json({ error }));
           
        } else {
            res.status(401).json({ message: "Email already used!" });
        }
    })
};

// Connexion
exports.login = (req, res, next) => {
    const sql = `SELECT * FROM user WHERE email=?`;
    db.query(sql, [req.body.email], function (err, result) {
        const user = result[0];
        if (!user) return res.status(401).json(({ message: 'User not found!' }));
        bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Invalid Password!' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
              expiresIn: '24h'
            }),
          })
        })
        .catch((error) => res.status(500).json({ error }));
    })
};


exports.getOneUser = (req, res, next) => {
    const sql = `SELECT * FROM user WHERE user.id=${req.body.userId}`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
    })
}

// Modifier le profil
exports.updatePP = (req, res, next) => {
    if (req.file) {
        const sql = `SELECT * FROM user WHERE id = ?`;
        db.query(sql, [req.params.id], function(err, result) {
        })
    }
} 
    
     