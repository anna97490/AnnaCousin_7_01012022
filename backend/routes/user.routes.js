const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controllers');
const multer = require('../middlewares/multer-config');
const emailValidator = require('../middlewares/email-validator')
const passwordValidator = require('../middlewares/password-validator');

router.post('/signup', multer, emailValidator, passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);                          
router.put('/:id/update', multer, userCtrl.updateUser); 
router.delete('/:id/delete', userCtrl.deleteUser) ;

module.exports = router;
