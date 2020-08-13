const db = require("../models")
const bcrypt = require("bcrypt")

module.exports = {
    findById: function (req, res) {
        db.User.findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    signup: function (req, res) {
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }).then(dbModel => res.json(dbModel.id))
            .catch(err => res.status(422).json(err));
    },

    login: function (req, res) {
        db.User.findOne({
            email: req.body.email
        }).then(data => {
            if (!data) {
                return res.status(404).send('no such user')
            } else {
                if (bcrypt, bcrypt.compareSync(req.body.password === user.password)) {
                    req.session.user = {
                        _id: data._id,
                        email: data.email
                    }
                    console.log(req.session.user)
                    res.send("login successful");
                } else {
                    res.status(401).send("wrong password")
                }
            }
        }).catch(err => {
            return res.status(500).end();
        });
    },

    update: function (req, res) {
        // TODO: this needs to be checked. remove TODO when checked.
        db.User.findOneAndUpdate({ _id: req.params.id }, {
            bio: req.body.bio,
            location: req.body.location,
            profilePicture: req.body.profile.Picture,
            bannerPicture: req.body.bannerPicture,
            tags: req.body.tags,
            host: req.body.host
        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },


    remove: function (req, res) {
        db.User.findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};