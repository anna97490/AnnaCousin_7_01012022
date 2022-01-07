const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const db = require('./config/database');

// Ajout des headers à l'objet réponse
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
  });
  
// Accès au corps de la req
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);
//app.use('/api/post', userpost);

db.sync()
.then(console.log('Connected to the Database!'))
.catch(error => console.log(error));



module.exports = app;