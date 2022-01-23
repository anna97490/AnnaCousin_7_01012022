const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controllers');
const multer = require('../middlewares/multer-config');
const emailValidator = require('../middlewares/email-validator');
const passwordValidator = require('../middlewares/password-validator');
const auth = require('../middlewares/auth');

router.post('/signup', multer, emailValidator, passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id/update', auth, multer, userCtrl.updateUser);
router.delete('/:id/delete', auth, userCtrl.deleteUser);

module.exports = router;
