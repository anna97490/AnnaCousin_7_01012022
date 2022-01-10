const Comment = require('../models/comment.models');
//ok

exports.createComment = (req, res, next) => {
    const comment = {
        userId: req.body.userId,
        postId: req.body.postId,
        date: req.body.date,
        text: req.body.text
    };
    Comment.create(comment)
    .then(() => res.status(201).json({ message: 'Comment successfully created!' }))
    .catch((error) => res.status(400).json({ error: 'here'}));
}

exports.getOneComment = (req, res, next) => {
    const id = req.body.id;
    Comment.findOne(id)
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
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body}
    Comment.findOne({where: { id: req.params.id }})
    .then(comment => {
        if (!comment){
          return res.status(404).json({ message: 'Comment not found!' });
        } 
    Comment.update({...commentObject}, { where: { id: req.params.id }})
        .then(() => res.status(200).json({message: 'Comment successfully updated !'}))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
}

exports.deleteComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id }})
    .then((user) => {
    console.log(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found!' })
        } else {
        //const filename = sauce.imageUrl.split('/images/')[1];
        //fs.unlink({where: { id: req.params.id}}/*`images/${filename}`*/, () => {
        Comment.destroy({ where: { id: req.params.id }})
        .then(() => {
            return res.status(200).json({message: 'Profil successfully deleted!'});  
        })
        .catch((error) => res.status(500).json({ error }));
        //});
      }
  })    
  .catch(error => { res.status(500).json({ error });
  })  
}