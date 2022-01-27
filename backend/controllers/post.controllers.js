const Post = require('../models/post.models');
const fs = require('fs');

// Créer un post
exports.createPost = (req, res, next) => {
  if (req.file) {
    Post.create({
      text: req.body.text,
      date: req.body.date,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      userId: req.body.userId,
      authorFullName: req.body.authorFullName,
    })
    .then(() => res.status(201).json({message: 'Post successfully created!'}))
    .catch((error) => res.status(400).json({ error: 'Incorrect request!' }));
  } else {
    Post.create({
      text: req.body.text,
      date: req.body.date,
      userId: req.body.userId,
      authorFullName: req.body.authorFullName,
    })
    .then(() => res.status(201).json({message: 'Post successfully created!'}))
    .catch((error) => res.status(400).json({ error: 'Incorrect request!' }));
  }
}

// Récupérer un post
exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
  .then((post) => {
    if(!post) return res.status(404).json({ error: "Post not found!" });
    res.status(200).json(post);
  })
  .catch((error) => res.status(500).json({ error: 'Server Error!' }));
};

// Récupérer tous les posts
exports.getAllPost = (req, res, next) => {
  Post.findAll({
    // Afficher les posts dans l'ordre croissant des dates
    order: [
      ['date', 'DESC']
    ]
  })
  .then((posts) => res.status(200).json(posts))
  .catch((error) => res.status(400).json({ error: 'Incorrect request!' }));
};

// Modifier un post
exports.updatePost = (req, res, next) => {
  const postObject = req.file ? {
    text: req.body.text,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    userId: req.body.userId,
    authorFullName: req.body.authorFullName,
  } : { ...req.body}
  Post.findOne({where: { id: req.params.id }})
  .then(post => {
    if (!post){
      return res.status(404).json({ message: 'Post not found!' });
    } 
    Post.update({...postObject}, { where: { id: req.params.id }})
    .then(() => res.status(200).json({message: 'Post successfully updated!'}))
    .catch((error) => res.status(400).json({ error: 'Incorrect request!' }));
  })
  .catch((error) => res.status(500).json({ error: 'Server error!' }));
};

//Supprimer un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id }})
  .then((post) => {
    if (!post) {
      return res.status(404).json({ message: 'User not found!' })
    } else if(post.imageUrl !== null) {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`./images/${filename}`, (error) => {
        if (error) throw error;
      Post.destroy({ where: { id: req.params.id }})
      .then(() => {
        return res.status(200).json({message: 'Post successfully deleted!'});  
      })
      .catch((error) => res.status(500).json({ error: 'Server error!' }));
      });
    } else {
      Post.destroy({
        where: { id: req.params.id }
      })
      .then(() => res.status(200).json({ message: 'Post successfully deleted!' }))
      .catch((error) =>  res.status(500).json({ error: 'Server Error!' }))
    } 
  })    
  .catch((error) => res.status(500).json({ error: 'Server error!' })) 
};
