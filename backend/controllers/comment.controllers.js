const Comment = require('../models/comment.models');

exports.createComment = (req, res, next) => {
    const comment = {
        ...req.body, // 0?
        likes: '',
      };
      Comment.create(comment)
        .then(() => res.status(201).json({ message: 'Comment successfully created!' }))
        .catch((error) => res.status(400).json({ error }));
}

exports.getOneComment = (req, res, next) => {
    Comment.findOne({ id: req.params.id })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(404).json({ error }));
}

exports.getAllComments = (req, res, next) => {
    Comment.findAll()
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
}

exports.updateComment = (req, res, next) => {
    
}

exports.deleteComment = (req, res, next) => {
    
}