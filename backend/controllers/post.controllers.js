const Post = require('../models/post.models');
const fs = require('fs');
//manque implementation des imgs

// Création de post
exports.createPost = (req, res, next) => {
  if (req.file) {
    Post.create({
        text: req.body.text,
        date: req.body.date,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: req.body.userId,
        authorFullName: req.body.authorFullName
    })
    .then(() => res.status(201).json({message: 'Post successfully created!'}))
    .catch( error => res.status(400).json({error}));
} else {
    Post.create({
        text: req.body.text,
        date: req.body.date,
        userId: req.body.userId,
        authorFullName: req.body.authorFullName
    })
    .then(() => res.status(201).json({message: 'Post successfully created!'}))
    .catch( error => res.status(500).json({error: 'Post pas posté'}));
}
}

// Lire un post
exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
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
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
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
  Post.findOne({ where: { id: req.params.id }})
  .then((post) => {
    if (!post) {
      return res.status(404).json({ message: 'User not found!' })
    } else if(post.imageUrl != null) {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
      Post.destroy({ where: { id: req.params.id }})
      .then(() => {
        return res.status(200).json({message: 'Post successfully deleted!'});  
      })
      .catch((error) => res.status(500).json({ error }));
      });
    } else {
      Post.destroy({
        where: { id: req.params.id }
      })
      .then(() => res.status(200).json({ message: 'Post successfully deleted!' }))
      .catch(error => {
        res.status(500).json({ error })
      })
    }
    
  })    
  .catch(error => { res.status(500).json({ error });
  }) 
};
