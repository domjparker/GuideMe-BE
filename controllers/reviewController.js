const db = require("../models")

module.exports = {
    findReview: function (req, res) {
        db.Review
            .find({
                adventureId: req.params.id
            })
            .populate('userId')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Review
            .create({
                body: req.body.body,
                title: req.body.title,
                userId: req.session.user.id,
                adventureId: req.body.adventureId,
                rating: req.body.rating
            }
            )
            .then(dbModel => {
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Review
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};