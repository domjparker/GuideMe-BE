const db = require("../models")
var mongoose = require('mongoose')

module.exports = {
    findAll: function (req, res) {
        db.Adventure
            .find(req.query)
            .populate('hostId')
            .populate('tags', 'tagName')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findTag: function (req, res) {
        db.Adventure
            .find({ tags: { $in: [req.params.tag] } })
            .populate('hostId')
            .populate('tags', 'tagName')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findLocation: function (req, res) {
        db.Adventure
            .find({ location: req.params.location })
            .populate('hostId')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Adventure
            .findById(req.params.id)
            .populate('hostId', `tags`)
            .populate('tags', 'tagName')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByHostId: function (req, res) {
        db.Adventure
            .find({ hostId: req.params.id })
            .populate('hostId')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // post request to create a new adventure + add new adventure to community db
    create: function (req, res) {
        db.Adventure
            .create(req.body)
            .then(dbModel => {
                res.json(dbModel)
                db.Community.create({
                    targetId: dbModel.hostId,
                    action: "newAdventure",
                    adventureId: dbModel._id,
                    postImageUrl: dbModel.adventureImageUrl
                }).then(() => {
                    res.status(204).end();
                }).catch(err => res.status(500).json(err));
            }).catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Adventure
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .populate('tags', 'tagName')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));

    },
    remove: function (req, res) {
        db.Adventure
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        db.Community.deleteMany({ adventureId: req.params.id })
            .then(() => res.status(204).end())
            .catch(err => res.status(500).json(err));
        db.Review.deleteMany({ adventureId: req.params.id })
            .then(() => res.status(204).end())
            .catch(err => res.status(500).json(err));
    }
}
