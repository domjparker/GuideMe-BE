const db = require("../models")

module.exports = {
    findReview: function (req, res) {
        db.Review
            .find({
                adventureId: req.params.id
            })
            .populate('userId')
            .populate('adventureId')
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
                rating: req.body.rating,
                hostId: req.body.hostId
            }
            )
            .then(dbModel => {
                res.json(dbModel)
                console.log('new review added', dbModel)
                db.Community.create({
                    targetId: dbModel.userId,
                    action: "newReview",
                    adventureId: dbModel.adventureId,
                    postImageUrl: null,
                    postText: dbModel.body
                }).then(() => {
                    res.status(204).end();
                }).catch(err => res.status(500).json(err));
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