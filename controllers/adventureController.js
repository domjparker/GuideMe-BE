const db = require("../models")
var mongoose = require('mongoose')

module.exports = {
    findAll: function (req, res) {
        db.Adventure
            .find(req.query)
            .populate('hostId')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findTag: function (req, res) {
        db.Adventure
            .find({ tags: { $in: ["5f34621533e8d50b0c680ffc"] } })
            .populate('hostId')
            .populate('tags')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findLocation: function (req, res) {
        db.Adventure
            .find({location:req.params.location})
            .populate('hostId')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Adventure
            .findById(req.params.id)
            .populate('hostId')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByHostId: function (req, res) {
        db.Adventure
            .find({hostId: req.params.id})
            .populate('hostId')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Adventure
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Adventure
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Adventure
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}
