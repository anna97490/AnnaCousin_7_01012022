const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controllers');
//const multer = require('multer');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneUser);                            
//router.get('/:id/logout',) logout
router.put('/:id/', userCtrl.updateUser); 
router.delete('/:id', userCtrl.deleteUser) ;

module.exports = router;
