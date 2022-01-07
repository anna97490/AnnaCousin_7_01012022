const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controllers');

router.post('/', postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.get('/:id/allcomments', postCtrl.getAllPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/id',);

module.exports = router;