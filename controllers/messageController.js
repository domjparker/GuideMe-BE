const db = require("../models")

module.exports = {
    findSentMessage: function(req,res) {
        db.Messages
        .find({$and: [{senderId:req.session.user.id}, {recieverId:req.params.id}]})
        .populate('senderId')
        .populate('recieverId')
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req,res) {
        db.Messages
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Messages
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};