const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controllers');
//const multer = require('multer');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);                          
router.put('/:id/update', userCtrl.updateUser); 
router.delete('/:id/delete', userCtrl.deleteUser) ;

module.exports = router;
