const Post = require('../models/post.models');
const fs = require('fs');
//manque implementation des imgs

// Création de post
exports.createPost = (req, res, next) => {
  const post = {
      userId: req.body.userId,
      date: req.body.date,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      likes: req.body.likes
  };
  Post.create(post)
  .then(() => res.status(201).json({ message: 'Post successfully created!' }))
  .catch((error) => res.status(400).json({ error: "no"}));
}

// Lire un post
exports.getOnePost = (req, res, next) => {
  const id = req.body.id;
  Post.findByPk(id)
    .then((post) => {
      if(!post) return res.status(404).json({ error: "Post not found!" });
      res.status(200).json(post);
    })
    .catch((error) => res.status(404).json({ error }));
};

// Lire tous les posts
exports.getAllPost = (req, res, next) => {
  Post.findAll()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error}));
};

// Modifier un post
exports.updatePost = (req, res, next) => {
  const postObject = req.file ? {
    ...JSON.parse(req.body),
    //imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  } : { ...req.body}
  Post.findOne({where: { id: req.params.id }})
  .then(post => {
    if (!post){
      return res.status(404).json({ message: 'Post not found!' });
    } 
    Post.update({...postObject}, { where: { id: req.params.id }})
      .then(() => res.status(200).json({message: 'Post successfully updated !'}))
      .catch((error) => res.status(500).json({ error: "no" }));
  })
  .catch((error) => res.status(500).json({ error: "no1" }));
};

//Supprimer un post
exports.deletePost = (req, res, next) => {
  const id = req.params;
  Post.destroy({ where: {id: id} })
  .then(post => {
    if ( post === 0) return res.status(404).json({error: "no"})
    res.status(200).json({message: 'Post Deleted!'})
  })
  .catch((error) => res.status(404).json({ error: "no1"  }));
};
