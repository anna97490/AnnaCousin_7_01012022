const Post = require('../models/post.models');
const fs = require('fs');


exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  const post = {
    ...postObject, // 0?
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    likes: '',
  };
  Post.create(post)
    .then(() => res.status(201).json({ message: 'Post successfully created!' }))
    .catch((error) => res.status(400).json({ error: 'Email already used!' }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllPost = (req, res, next) => {
  Post.findAll()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.updatePost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Post.updateOne({ id: req.params.id }, { ...postObject, id: req.params.id })
    .then(() => res.status(200).json({ message: 'User updated successfully!' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.destroy({ where : { id: req.body.id }})
    .then((post) => {
      const filename = user.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        /*Post.deleteOne({ id: req.params.id })
          .then(() => res.status(200).json({ message: 'Post deleted !' }))
          .catch((error) => res.status(400).json({ error }));*/
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
