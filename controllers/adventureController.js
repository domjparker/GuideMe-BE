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
            .find({ tags: { $in: [req.params.tag] } })
            .populate('hostId')
            .populate('tags')
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
            .populate('hostId')
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
    create: function (req, res) {
        db.Adventure
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        const queryObj = req.body
        const tags = req.body.tags
        delete queryObj.tags
        if(tags){
            db.Adventure
            .findOneAndUpdate({ _id: req.params.id }, queryObj)
            .findOneAndUpdate({ _id: req.params.id }, { $push: { tags: [tags] } })
            .populate('tags', 'tagName')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        }else{
            db.Adventure
            .findOneAndUpdate({ _id: req.params.id }, queryObj)
            .populate('tags', 'tagName')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        }
        
    },
    remove: function (req, res) {
        db.Adventure
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}
