const Comment = require('../models/comment.models');

exports.createComment = (req, res, next) => {
    const comment = {
        userId: req.body.userId,
        postId: req.body.postId,
        date: req.body.date,
        text: req.body.text
    };
    Comment.create(comment)
    .then(() => res.status(201).json({ message: 'Comment successfully created!' }))
    .catch((error) => res.status(400).json({ error: "no"}));
}

exports.getOneComment = (req, res, next) => {
    const id = req.body.id;
    Comment.findByPk({id})
    .then((comment) => {
        if(!comment) return res.status(404).json({ error: "no" });
        res.status(200).json(comment);
      })
      .catch((error) => res.status(404).json({error: "no1"}));
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll()
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error: "no" }));
}

exports.updateComment = (req, res, next) => {// tout revoir
    const commentObject = req.file ? {
        ...JSON.parse(req.body),
        //imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body}
    Comment.findOne({where: { id: req.params.id }})
    .then(comment => {
        if (!comment){
          return res.status(404).json({ message: 'Comment not found!' });
        } 
    Comment.update({...commentObject}, { where: { id: req.params.id }})
        .then(() => res.status(200).json({message: 'Comment successfully updated !'}))
        .catch((error) => res.status(500).json({ error: "no" }));
    })
    .catch((error) => res.status(500).json({ error: "no1" }));
}

exports.deleteComment = (req, res, next) => {
    const id = req.params;
    Comment.destroy({ where: {id: id} })
    .then(comment => {
      if ( comment === 0) return res.status(404).json({error: "no"})
      res.status(200).json({message: 'Post Deleted!'})
    })
    .catch((error) => res.status(404).json({ error: "no1" }));
}