const db = require("../models")

module.exports = {
    findAll: function (req, res) {
        db.Community
        .find(req.query)
        .sort({createdAt:'desc'})
        .populate('targetId')
        // .populate('adventureId', "adventureName")
        .populate('adventureId')
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }, 
    create: function (req, res) {
        db.Community
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}
